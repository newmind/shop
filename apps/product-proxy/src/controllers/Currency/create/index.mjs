
import { sendEvent } from "@sys.packages/rabbit";
import { sequelize, models } from '@sys.packages/db';


export default () => async (ctx) => {
  try {
    const { Currency } = models;
    const formData = ctx['request']['body'];

    const transaction = await sequelize.transaction();

    const result = await Currency.create(formData, {
      transaction,
    });

    await sendEvent(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CURRENCY_CREATED'], JSON.stringify(result.toJSON()));

    await transaction.commit();

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
