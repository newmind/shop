
import {genHash256, token} from '@sys.packages/sys.utils';
import { models, sequelize, Sequelize } from '@sys.packages/db';

import jwt from "jsonwebtoken";


const { UniqueConstraintError } = Sequelize;


export default () => async (ctx) => {
  const { Passport, User } = models;
  const transaction = await sequelize.transaction();

  try {
    const formData = ctx.request['body'];

    const hashPassword = genHash256(formData['password'], process.env['PASSWORD_SALT']);

    const user = await User.create({
      login: formData['login'],
      password: hashPassword,
    }, { transaction });

    await Passport.create({
      userId: user['id'],
      role: 'customer',
      name: formData['name'],
      surname: formData['surname'],
      birthday: formData['birthday'],
      email: formData['login'],
      phone: formData['phone'],
      patronymic: formData['patronymic'],
      sex: formData['sex'],
    }, { transaction });

    await transaction.commit();

    const today = new Date();
    const expirationTime = parseInt((today.getTime() / 1000) + Number(process.env['JWT_EXP']), 10);
    const refreshToken = token(process.env['JWT_SECRET']).digest('hex');

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
      },
    };
  }
  catch (error) {

    await transaction.rollback();

    if (error instanceof UniqueConstraintError) {
      ctx.status = 400;
      return ctx.body = {
        success: false,
        error: {
          code: 400,
          message: 'Пользователь с таким E-Mail уже зарегистрирован',
        }
      };
    }

    ctx.status = 500;
    ctx.body = {
      success: false,
      error: {
        code: 500,
        message: error['message'],
      }
    };
  }
};
