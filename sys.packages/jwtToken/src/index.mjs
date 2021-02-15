
import logger from "@sys.packages/logger";
import request from "@sys.packages/request";
import { UnauthorizedError } from '@packages/errors';

import jwt from 'jsonwebtoken';

export const { TokenExpiredError, JsonWebTokenError } = jwt;


function resetCookie(ctx, name) {
  ctx.cookies.set(name, null, { httpOnly: true });
}

export const getCookie = async (ctx, name) => {
  const cookies = ctx['cookie'] || {};
  const cookie = cookies[name] || null;

  if ( ! cookie) {
    logger.info('Пользовательские cookie не найдены');
    throw new UnauthorizedError({ code: '2.2.2', message: 'User not authorize' });
  }

  logger.info('Раскодирование cookie');
  const data = JSON.parse(decodeURIComponent(cookie));

  logger.info('Cookie: ' + JSON.stringify(data));

  if ( ! data['token'] || ! data['refreshToken']) {
    logger.info('Неверный формат объекта cookie');
    resetCookie(ctx, name);
    throw new UnauthorizedError({ code: '2.2.2', message: 'User not authorize' });
  }

  return data;
};

export const checkCookie = async (url, data) => {
  const result = await request({
    url,
    method: 'post',
    data,
  });

  return {
    status: 200,
    data: result['data'],
  };
};

// const refreshToken = async (cookie, { serviceUrl }) => {
//   try {
//     const { data } = await request({
//       url: `${serviceUrl}/refresh`,
//       method: 'post',
//       data: cookie,
//     });
//
//     return {
//       status: 200,
//       data: data['data'],
//     };
//
//   } catch(error) {
//
//     return {
//       status: 500,
//       data: null,
//     };
//   }
// };

export const decode = (token, secret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err);
      }
      resolve(decoded);
    });
  });
};

export const sign = (data, secret) => {
  return jwt.sign(data, secret, {
    algorithm:  "HS256"
  });
}


export const middleware = (options) => async (ctx, next) => {
  try {
    logger.info('Получение данных cookie');
    const cookie = await getCookie(ctx, options['cookieName']);
    logger.info('Проверка авторизованного токена');
    await checkCookie(options['checkUrl'], cookie);

    logger.info('Декодирование авторизационного токена');
    ctx.user = await decode(cookie['token'], options['secret']);

    await next();
  }
  catch (error) {

    logger.error(error);

    if (error instanceof UnauthorizedError) {
      resetCookie(ctx, options['cookieName']);
    }

    throw error;
  }
};