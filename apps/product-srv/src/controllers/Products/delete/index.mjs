
import { sendEvent } from "@sys.packages/rabbit";
import { sequelize, models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { uuid } = ctx['request']['body'];
  const { Product, Attribute, Gallery } = models;

  const transaction = await sequelize.transaction();

  await Attribute.destroy({
    where: { productId: uuid },
    transaction,
  });

  await Gallery.destroy({
    where: { productId: uuid },
    transaction,
  });

  await Product.destroy({
    where: { uuid },
    transaction,
  });

  await sendEvent(process.env['RABBIT_PRODUCT_SRV_EXCHANGE_PRODUCT_DELETED'], JSON.stringify(uuid));

  await transaction.commit();

  ctx.body = {
    success: true,
    data: uuid,
  };
};
