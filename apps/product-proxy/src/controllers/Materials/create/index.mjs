
import {sendEvent} from "@sys.packages/rabbit";
import { sequelize, models } from '@sys.packages/db';


export default () => async (ctx) => {
  try {
    const { Material } = models;
    const data = ctx['request']['body'];

    const transaction = await sequelize.transaction();

    const result = await Material.create(data, { transaction });

    await transaction.commit();

    sendEvent(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_MATERIAL_CREATED'], JSON.stringify(result.toJSON()));

    ctx.body = {
      success: true,
      data: result.toJSON(),
    };
  }
  catch(e) {

    ctx.status = 500;
    ctx.body = {
      success: false,
      error: {
        code: '500',
        message: e.message,
      }
    };
  }
};
