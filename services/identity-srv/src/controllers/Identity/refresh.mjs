
// import { UnauthorizedError } from '@packages/errors';

// import { models } from '@sys.packages/db';
// import { token } from '@sys.packages/utils';


export default () => async (ctx) => {
  // const { settings } = models;
  // const { token: accessToken } = ctx['request']['body'];
  //
  // const userFromToken = await decode(accessToken);
  // const user = await settings.findOne({ where: { id: userFromToken['id'] }});
  //
  // if ( ! user) {
  //   throw new UnauthorizedError('Пользователь не прошел верификацию');
  // }
  //
  // // обновляем токен
  // const today = new Date();
  // const expirationTime = parseInt((today.getTime() / 1000) + Number(process.env['JWT_EXP']), 10);
  // const newRefreshToken = token(process.env['JWT_SECRET']).digest('hex');
  //
  // // await settings.update({ refreshToken }, { where: { id: userFromToken['id'], refreshToken: newRefreshToken }});
  //
  // const payload = {
  //   ...userFromToken,
  //   exp: expirationTime,
  // };
  //
  // const identityToken = jwt.sign(payload, process.env['JWT_SECRET'], {
  //   algorithm:  "HS256"
  // });

  ctx.body = {
    success: true,
    data: {
      // token: identityToken,
      // refreshToken: newRefreshToken,
    }
  };
};
