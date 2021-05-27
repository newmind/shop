
import { UnauthorizedError } from '@packages/errors';

import { models, sequelize } from '@sys.packages/db';
import { decode, sign } from '@sys.packages/jwt';
import { token } from "@sys.packages/utils";


export default () => async (ctx) => {
  const { RefreshToken } = models;
  const { accessToken, refreshToken } = ctx['request']['body'];

  const { payload } = decode(accessToken);
  const transaction = await sequelize.transaction();

  const result = await RefreshToken.findOne({
    where: {
      userId: payload['id'],
      refreshToken,
    },
    transaction,
  });

  if ( ! result) {
    throw new UnauthorizedError('Пользователь не авторизован');
  }

  const today = Date.now();
  const currentIP = ctx['ips'].length > 0 ? ctx['ips'][ctx['ips'].length - 1] : ctx['ip'];
  const data = result.toJSON();

  if (data['ip'] !== currentIP) {
    throw new UnauthorizedError('Пользователь не авторизован');
  }

  if (data['userAgent'] !== ctx['userAgent']['source']) {
    throw new UnauthorizedError('Пользователь не авторизован');
  }

  if (Number(today) >= Number(data['expiresIn'])) {
    throw new UnauthorizedError('Пользователь не авторизован. Токен отозван');
  }

  // обновляем токен
  const expirationTime = Number(today + Number(process.env['JWT_EXP'] * 60 * 1000));
  const newRefreshToken = token(today + process.env['JWT_SECRET']).digest('hex');

  await RefreshToken.update({
    userId: data['userId'],
    refreshToken: newRefreshToken,
    userAgent: ctx['userAgent']['source'],
    ip: currentIP,
  }, {
    where: {
      userId: data['userId'],
      refreshToken,
    },
    transaction,
  });

  await transaction.commit();

  const newPayload = {
    ...payload,
    exp: parseInt(String(expirationTime / 1000), 10),
  };

  const newAccessToken = sign(newPayload, process.env['JWT_SECRET'], {
    algorithm:  "HS256"
  });

  ctx.body = {
    success: true,
    data: {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    }
  };
};
