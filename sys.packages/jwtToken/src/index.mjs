
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
    throw new UnauthorizedError({ code: '2.2.2', message: 'User not authorize' });
  }

  const data = JSON.parse(decodeURIComponent(cookie));

  if ( ! data['token'] || ! data['refreshToken']) {
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
    const cookie = await getCookie(ctx, options['cookieName']);
    await checkCookie(options['checkUrl'], cookie);

    ctx.user = await decode(cookie['token'], options['secret']);

    await next();
  }
  catch (error) {

    if (error instanceof UnauthorizedError) {
      resetCookie(ctx, options['cookieName']);
    }

    throw error;
  }
};