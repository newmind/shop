
import jwt from 'jsonwebtoken';

import { genHash256, token } from '@sys.packages/sys.utils';
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  try {

    const { User } = models;
    const { login, password } = ctx['request']['body'];

    // проверяем есть ли пользователь

    const hashPassword = genHash256(password, process.env['PASSWORD_SALT']);
    const user = await User.findOne({ where: { login, password: hashPassword }});

    if ( ! user) {
      ctx.status = 200;
      return ctx.body = {
        success: true,
        data: null,
      };
    }

    // создаем токен для обновления
    const today = new Date();
    const expirationTime = parseInt((today.getTime() / 1000) + Number(process.env['JWT_EXP']), 10);
    const refreshToken = token(process.env['JWT_SECRET']).digest('hex');

    // await User.update({ refreshToken }, { where: { id: user['id'] }});


    // организуем авторизационный объект
    const payload = {
      id: user['id'],
      exp: expirationTime,
    };

    const identityToken = jwt.sign(payload, process.env['JWT_SECRET'], {
      algorithm:  "HS256"
    });

    ctx.body = {
      success: true,
      data: {
        token: identityToken,
        refreshToken: refreshToken,
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
