
import {sendEvent} from "@sys.packages/rabbit";
import { sequelize, models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Material } = models;
  const data = ctx['request']['body'];

  const transaction = await sequelize.transaction();

  const result = await Material.create(data, { transaction });

  await sendEvent(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_MATERIAL_CREATED'], JSON.stringify(result.toJSON()));

  await transaction.commit();

  ctx.body = {
    success: true,
    data: result.toJSON(),
  };
};
