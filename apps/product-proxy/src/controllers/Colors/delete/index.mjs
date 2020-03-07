
import {sendEvent} from "@sys.packages/rabbit";
import { sequelize, models } from '@sys.packages/db';


export default () => async (ctx) => {
  try {
    const { Color } = models;
    const { id } = ctx['request']['body'];

    const transaction = await sequelize.transaction();

    await Color.destroy({
      where: { id },
    }, {
      transaction,
    });

    await transaction.commit();

    sendEvent(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_COLOR_DELETED'], JSON.stringify(id));

    ctx.body = {
      success: true,
      data: id,
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
