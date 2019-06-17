'use strict';

import passport from 'koa-passport';
import jwt from 'jsonwebtoken';


export default () => async (ctx, next) => {

  await passport.authenticate('local', function (err, user) {

    // if (user === false) {
    //   ctx.body = "Login failed";
    // }
    // else {

      const today = new Date();
      const expirationDate = new Date(today);
      expirationDate.setDate(today.getDate() + 60);

      const payload = {
        id: '78687',//user.id,
        displayName: 'name',//user.displayName,
        email: 'eee@rt.ru',//user.email,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
      };
      const token = jwt.sign(payload, process.env['JWT_SECRET'], {
        issuer:  'viktor',
        subject:  'shop',
        audience:  'ppp@mmm.ru',
        // expiresIn:  '12h',
        algorithm:  "HS256"
      }); //здесь создается JWT

      ctx.body = {user: user.displayName, token: 'JWT ' + token};
    // }
  })(ctx, next);
};
