
import { sendEvent } from "@sys.packages/rabbit2";
import { sequelize, models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Units } = models;
  const { id } = ctx['request']['body'];

  const transaction = await sequelize.transaction();

  await Units.destroy({
    where: { id },
    transaction,
  });

  await transaction.commit();

  await sendEvent(process.env['RABBIT_PRODUCT_SRV_EXCHANGE_UNIT_DELETED'], JSON.stringify(id));

  ctx.body = {
    success: true,
    data: id,
  };
};
