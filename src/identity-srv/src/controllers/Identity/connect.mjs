'use strict';

import jwt from 'jsonwebtoken';

import { genHash256, token } from '@packages/sys.utils';
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
    ctx.throw(404, { code: '404', message: 'User not found' });
  }

  await User.update({ refreshToken: null }, {
    where: { id: user['id'] }
  });

  const today = new Date();
  const expirationTime = parseInt((today.getTime() / 1000) + Number(process.env['JWT_EXP']), 10);
  const refreshToken = token(process.env['JWT_SECRET']).digest('hex');

  await User.update({ refreshToken }, {
    where: { id: user['id'] }
  });

  const payload = {
    id: user['id'],
    exp: expirationTime,
  };

  const identityToken = jwt.sign(payload, process.env['JWT_SECRET'], {
    // issuer:  'viktor',
    // subject:  'shop',
    // audience:  'ppp@mmm.ru',
    algorithm:  "HS256"
  });

  ctx.body = {
    data: {
      token: identityToken,
      refreshToken: refreshToken,
    }
  };
};
