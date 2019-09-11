'use strict';

import jwt from 'jsonwebtoken';

import { models } from '@sys.packages/db';


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

    const { User } = models;
    const { token, refreshToken } = ctx['request']['body'];

    const userFromToken = await decode(token);
    const user = await User.findOne({ where: { id: userFromToken['id'], refreshToken }});

    if ( ! user) {
      ctx.status = 401;
      return ctx.body = {
        success: false,
        error: {
          code: '',
          message: 'Пользователь не прошел верификацию'
        }
      };
    }

    // обновляем токен
    const today = new Date();
    const expirationTime = parseInt((today.getTime() / 1000) + Number(process.env['JWT_EXP']), 10);
    const newRefreshToken = token(process.env['JWT_SECRET']).digest('hex');

    await User.update({ refreshToken }, { where: { id: userFromToken['id'], refreshToken: newRefreshToken }});


    const payload = {
      ...userFromToken,
      exp: expirationTime,
    };

    const identityToken = jwt.sign(payload, process.env['JWT_SECRET'], {
      algorithm:  "HS256"
    });

    ctx.status = 200;
    ctx.body = {
      data: {
        token: identityToken,
        refreshToken: newRefreshToken,
      }
    };

  } catch(error) {

    ctx.status = 500;
    ctx.body = {
      success: false,
      error: {
        code: '',
        message: error['message'],
      },
    };
  }
};
