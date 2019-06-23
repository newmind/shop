'use strict';

import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import { genHash256 } from '@packages/sys.utils';
import { models } from '@packages/db';


export default () => async (ctx, next) => {
  const { User } = models;
  const { login, password } = ctx.request.body;

  const hashPassword = genHash256(password, process.env['PASSWORD_SALT']);

  const user = await User.findOne({
    where: {
      login,
      password: hashPassword,
    }
  });

  if ( ! user) {
    ctx.throw(401, { code: '', message: '' });
  }

  const today = new Date();
  const expirationTime = parseInt(today.getTime() / 1000 + process.env['JWT_EXP'], 10);

  const payload = {
    id: user['id'],
    login: user['login'],
    password: user['password'],
    exp: expirationTime,
  };

  const token = jwt.sign(payload, process.env['JWT_SECRET'], {
    // issuer:  'viktor',
    // subject:  'shop',
    // audience:  'ppp@mmm.ru',
    algorithm:  "HS256"
  });

  ctx.body = {
    token: token
  };
};
