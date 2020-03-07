
import { sendEvent } from "@sys.packages/rabbit";
import { sequelize, models } from '@sys.packages/db';


export default () => async (ctx) => {

  const { Comment } = models;
  const { productId } = ctx.params;
  const { ...formData } = ctx.request.body;

  const transaction = await sequelize.transaction();

  const result = await Comment.create({
    productId,
    ...formData
  }, { transaction });

  await transaction.commit();

  sendEvent(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_COMMENT_UPDATED'], JSON.stringify(result.toJSON()));

  ctx.body = {
    success: true,
    data: result.toJSON(),
  };
};
