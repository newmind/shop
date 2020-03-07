
import { sendEvent } from "@sys.packages/rabbit";
import { sequelize, models } from '@sys.packages/db';


export default () => async (ctx) => {
  try {

    const { id } = ctx['request']['body'];

    await sequelize.transaction(async (transaction) => {

      await models['Category'].destroy({
        where: { id },
        transaction,
      });
    });

    sendEvent(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CATEGORY_DELETED'], JSON.stringify(id));

    ctx.body = {
      success: true,
      data: id,
    };

  } catch (error) {

    ctx.body = {
      success: false,
      error: {
        code: error.original.code,
        message: error.original.detail,
      }
    };
  }
};
