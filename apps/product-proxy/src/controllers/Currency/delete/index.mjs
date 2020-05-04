
import { sendEvent } from "@sys.packages/rabbit";
import { sequelize, models } from '@sys.packages/db';


export default () => async (ctx) => {
  try {
    const { Currency } = models;
    const { uuid } = ctx['request']['body'];

    const transaction = await sequelize.transaction();

    await Currency.destroy({
      where: { uuid },
      transaction,
    });

    await sendEvent(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CURRENCY_DELETED'], JSON.stringify(uuid));

    await transaction.commit();

    ctx.body = {
      success: true,
      data: uuid,
    };
  }
  catch(e) {

    ctx.status = 500;
    ctx.body = {
      success: false,
      error: {
        code: '500',
        message: e['message'],
      }
    };
  }
};
