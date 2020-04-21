
import { sendEvent } from "@sys.packages/rabbit";
import { sequelize, models } from '@sys.packages/db';


export default () => async (ctx) => {
  try {
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

    await transaction.commit();

    sendEvent(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_DELETED'], JSON.stringify(uuid));

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
        message: e.message,
      },
    };
  }
};
