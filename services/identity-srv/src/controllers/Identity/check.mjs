
import { NetworkError, BadRequestError, UnauthorizedError } from '@packages/errors';

import { decode, TokenExpiredError, JsonWebTokenError } from '@sys.packages/jwt';


export default () => async (ctx) => {
  try {
    const { token } = ctx['request']['body'];

    await decode(token, process.env['JWT_SECRET']);

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
