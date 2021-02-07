
import { UUID } from '@sys.packages/utils';
import { sequelize, models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { uuid } = ctx['params'];
  const { Gallery } = models;
  const fileName = `${UUID()}.jpg`;

  const transaction = await sequelize.transaction();

  const image = await Gallery.findOne({
    row: true,
    where: {
      uuid,
    },
    transaction,
  });

  await Gallery.create({
    uuid: fileName,
    small: image['small'],
    middle: image['middle'],
    large: image['large'],
  }, {
    transaction,
  });

  await transaction.commit();

  ctx.status = 200;
  ctx.body = {
    success: true,
    data: fileName,
  };
};
