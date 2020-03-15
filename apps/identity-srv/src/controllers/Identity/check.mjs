'use strict';

import jwt from 'jsonwebtoken';

const { TokenExpiredError } = jwt;


const decode = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env['JWT_SECRET'], (err, decoded) => {
      if (err) {
        reject(err);
      }
      resolve(decoded);
    });
  });
};


export default () => async (ctx) => {
  try {

    const { token } = ctx['request']['body'];

    // декодируем авторизационный токен
    const user = await decode(token);

    ctx.status = 200;
    ctx.body = {
      success: true,
      data: user,
    };
  }
  catch (error) {

    if (error instanceof TokenExpiredError) {

      ctx.status = 400;
      return ctx.body = {
        success: true,
        data: null,
      };
    }

    ctx.status = 500;
    ctx.body = {
      success: false,
      error: {
        code: 500,
        message: error['message'],
      }
    };
  }
};
