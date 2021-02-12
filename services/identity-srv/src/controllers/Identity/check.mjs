
import { NetworkError, BadRequestError, UnauthorizedError } from '@packages/errors';

import jwt from 'jsonwebtoken';


const { TokenExpiredError, JsonWebTokenError } = jwt;


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

    await decode(token);

    ctx.body = {
      success: true,
      data: null,
    };
  }
  catch (error) {

    if (error instanceof TokenExpiredError) {
      throw new UnauthorizedError({ code: '20.0.100', message: 'Время жизни токена истекло' });
    }
    else if (error instanceof JsonWebTokenError) {
      throw new BadRequestError({ code: '20.0.150', message: 'Невалидный токен' });
    }

    throw new NetworkError({ code: '20.0.200', message: error['message'] });
  }
};
