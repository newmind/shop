
import { sendEvent } from '@sys.packages/rabbit';
import { sequelize, models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Gallery } = models;
  const data = ctx['request']['body'];

  const transaction = await sequelize.transaction();

  await Gallery.destroy({
    where: { externalId: data['externalId'] },
  }, {
    transaction,
  });

  await sendEvent(process.env['RABBIT_GALLERY_PROXY_EXCHANGE_GALLERY_DELETED'], JSON.stringify(data['externalId']))

  await transaction.commit();

  ctx.body = {
    success: true,
    data: data['externalId'],
  };
};
