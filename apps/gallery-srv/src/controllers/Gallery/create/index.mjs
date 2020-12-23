
import { UUID } from '@sys.packages/sys.utils';
import { sequelize, models } from '@sys.packages/db';


const getBufferFromRequest = (req) => {
  const buffer = [];

  return new Promise((resolve, reject) => {
    req.on('data', (data) => {
      buffer.push(data);
    });

    req.on('error', reject);

    req.on('end', () => {
      resolve(Buffer.concat(buffer));
    });
  });
};

export default () => async (ctx) => {
  const { Gallery } = models;
  const externalId = UUID();

  const buffer = await getBufferFromRequest(ctx['req']);

  const transaction = await sequelize.transaction();

  await Gallery.create({
    file: buffer,
    externalId,
  }, {
    transaction,
  });

  await transaction.commit();

  ctx.status = 200;
  ctx.body = {
    success: true,
    data: {
      externalId,
    },
  };
};
