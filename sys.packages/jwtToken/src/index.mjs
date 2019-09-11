'use strict';

import request from "axios";
import jwt from 'jsonwebtoken';


export default (options) => async (ctx, next) => {

  const { name, serviceUrl } = options;

  try {

    const cookies = ctx['cookie'] || {};
    const cookie = cookies[name] || null;

    if ( ! cookie) {

      ctx.status = 401;
      return ctx.body = {
        success: true,
        data: null,
      };
    }

    const cookieObject = JSON.parse(decodeURIComponent(cookie));

    if ( ! cookieObject['token'] ||  ! cookieObject['refreshToken']) {

      ctx.status = 401;
      return ctx.body = {
        success: true,
        data: null,
      };
    }

    const { data } = await request({
      url: `${serviceUrl}/check`,
      method: 'post',
      data: cookieObject,
    });

    ctx.user = data['data'];

    return next();

  } catch(error) {

    ctx.status = 500;
    ctx.body = {
      success: false,
      error: {
        code: '',
        message: error['message']
      },
    };
  }

  //   let errorResult = {};
  //
  //   if (error['response']) {
  //     const { data } = error.response;
  //     errorResult = data;
  //   } else {
  //     errorResult = error;
  //   }
  //
  //   if (errorResult['status'] === 403) {
  //
  //     const cookies = ctx['cookie'] || {};
  //     const cookie = cookies[name] || null;
  //
  //     if ( ! cookie) {
  //       ctx.throw(500, 'Неверный объект cookie');
  //     }
  //
  //     const { refreshToken = null } = JSON.parse(decodeURIComponent(cookie));
  //
  //     if ( ! refreshToken) {
  //       ctx.throw(500, 'Неверное свойство cookie');
  //     }
  //
  //     const { data } = await request({
  //       url: `${serviceUrl}/refresh`,
  //       method: 'post',
  //       data: {
  //         token: refreshToken,
  //       },
  //     });
  //
  //     const jsonString = JSON.stringify(data['data']).replace(/[{}]/ig, '');
  //
  //     ctx.cookies.set(name, `{${encodeURI(jsonString)}}`, {
  //       path: '/',
  //       httpOnly: true,
  //     });
  //
  //     return next();
  //   } else {
  //
  //     ctx.throw(errorResult['status'], errorResult['message']);
  //   }
  // }
};

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
