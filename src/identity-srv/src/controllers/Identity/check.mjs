'use strict';

import jwt from 'jsonwebtoken';


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

  } catch (error) {

    ctx.status = 500;
    ctx.body = {
      success: false,
      error: {
        code: '',
        message: error['message'],
      }
    };
  }
};
