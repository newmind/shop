'use strict';

import jwt from 'jsonwebtoken';

import { token } from '@packages/sys.utils';
import { models } from '@packages/db';


export default () => async (ctx) => {
  const { User } = models;
  const { token: refreshToken } = ctx.request.body;

  const user = await User.findOne({
    where: { refreshToken }
  });

  if ( ! user) {
    ctx.throw(401, { code: '', message: '' });
  }

  const today = new Date();
  const expirationTime = parseInt((today.getTime() / 1000) + Number(process.env['JWT_EXP']), 10);
  const newRefreshToken = token(process.env['JWT_SECRET']).digest('hex');

  await User.update({ refreshToken }, {
    where: { refreshToken: newRefreshToken }
  });

  const payload = {
    id: user['id'],
    login: user['login'],
    password: user['password'],
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
      refreshToken: newRefreshToken,
    }
  };
};
