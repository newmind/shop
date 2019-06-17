'use strict';

import Koa from 'koa';
import Router from 'koa-router';

import koaBodyparser from 'koa-bodyparser';
import logger from 'koa-logger'; // опциональный модуль для логов сетевых запросов. Полезен при разработке.

import passport from 'koa-passport'; //реализация passport для Koa
import LocalStrategy from 'passport-local'; //локальная стратегия авторизации
import PassportJWT  from 'passport-jwt'; // авторизация через JWT


const app = new Koa();
const router = new Router();


app.use(koaBodyparser({
  enableTypes: ['json', 'form'],
  onerror: (err, ctx) => {
    ctx.throw('body parse error', 422);
  }
}));

app.use(logger());
app.use(passport.initialize());


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false
  },
  function (email, password, done) {
    // User.findOne({email}, (err, user) => {
    //   if (err) {
    //     return done(err);
    //   }
    //
    //   if (!user || !user.checkPassword(password)) {
    //     return done(null, false, {message: 'Нет такого пользователя или пароль неверен.'});
    //   }
      return done(null, { a: 1 });
    // });
  }
  )
);

const jwtOptions = {
  jwtFromRequest: PassportJWT.ExtractJwt.fromHeader(),
  secretOrKey: process.env['JWT_SECRET']
};

passport.use(new PassportJWT.Strategy(jwtOptions, function (payload, done) {
    // User.findById(payload.id, (err, user) => {
    //   if (err) {
    //     return done(err)
    //   }
    //   if (user) {
        done(null, {bbb: 111});
    //   } else {
    //     done(null, false)
      // }
    // })
  })
);


export const initRouter = (callback) => {

  callback(router);

  app.use(router.routes());
  app.use(router.allowedMethods());
};

export default app;
