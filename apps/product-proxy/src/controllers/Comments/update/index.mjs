
import { sendEvent } from "@sys.packages/rabbit";
import { sequelize, models } from '@sys.packages/db';


export default () => async (ctx) => {
  try {
    const { Comment, Product } = models;
    const { id } = ctx['params'];
    const formData = ctx['request']['body'];

    const transaction = await sequelize.transaction();

    await Comment.update(formData, {
      where: { id },
      transaction,
    });

    const result = await Comment.findOne({
      include: [{
        model: Product,
        as: 'product',
        attributes: ['id', 'uuid', 'brand']
      }],
      where: { id },
      transaction,
    });

    await sendEvent(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_COMMENT_UPDATED'], JSON.stringify(result.toJSON()));

    await transaction.commit();

    ctx.body = {
      success: true,
      data: result.toJSON(),
    };
  }
  catch(error) {

    ctx.status = 500;
    ctx.body = {
      success: false,
      error: { code: 500, message: error['message'] },
    };
  }
};
