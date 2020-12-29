
import {sendEvent} from "@sys.packages/rabbit";
import { sequelize, models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Material } = models;
  const { id } = ctx['request']['body'];

  const transaction = await sequelize.transaction();

  await Material.destroy({
    where: { id },
  }, {
    transaction,
  });

  await sendEvent(process.env['RABBIT_PRODUCT_SRV_EXCHANGE_MATERIAL_DELETED'], JSON.stringify(id));

  await transaction.commit();

  ctx.body = {
    success: true,
    data: id,
  };
};
