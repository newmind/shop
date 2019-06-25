'use strict';

import jwt from 'jsonwebtoken';


export default () => async (ctx, next) => {
  try {

    const { token } = ctx.request.body;

    const user = await new Promise((resolve, reject) => {

      jwt.verify(token, process.env['JWT_SECRET'], (err, decoded) => {
        if (err) {
          reject(err);
        }
        resolve(decoded);
      });
    });

    ctx.body = user;

  } catch (error) {

    ctx.throw(401, { code: 401, message: 'token invalid' });
  }
};
