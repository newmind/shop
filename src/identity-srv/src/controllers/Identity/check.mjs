'use strict';

import jwt from 'jsonwebtoken';


export default () => async (ctx, next) => {
  const { token } = ctx.request.body;

  const user = await new Promise((resolve, reject) => {

    jwt.verify(token, process.env['JWT_SECRET'], (err, decoded) => {
      if (err) {
        reject(err);
      }

      const { exp } = decoded;
      const nowDate = Math.round(Date.now() / 1000);

      console.log(exp, nowDate, exp > nowDate);

      resolve(decoded);
    });
  });

  ctx.body = user;
};
