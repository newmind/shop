
import { sendEvent } from "@sys.packages/rabbit";
import { sequelize, models } from '@sys.packages/db';


export default () => async (ctx) => {
  try {
    const { Category } = models;
    const formData = ctx['request']['body'];

    const transaction = await sequelize.transaction();

    const result = await Category.create(formData, { transaction });

    await transaction.commit();

    sendEvent(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CATEGORY_CREATED'], JSON.stringify(result.toJSON()));

    ctx.body = {
      success: true,
      data: result.toJSON(),
    };
  }
  catch(error) {

    ctx.status = 500;
    ctx.body = { success: false, error: { code: '500', message: error['message'] }};
  }
};
