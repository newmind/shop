
import { NetworkError, BadRequestError } from '@packages/errors';

import jwt from 'jsonwebtoken';


const { TokenExpiredError } = jwt;


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

    const { token } = ctx['request']['body'];

    // декодируем авторизационный токен
    const user = await decode(token);

    ctx.status = 200;
    ctx.body = {
      success: true,
      data: user,
    };
  }
  catch (error) {

    if (error instanceof TokenExpiredError) {

      throw new BadRequestError('Время жизни токена истекло');
    }

    throw new NetworkError('Что-то пошло не так');
  }
};
