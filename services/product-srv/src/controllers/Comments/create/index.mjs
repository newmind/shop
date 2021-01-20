
import { sendEvent } from "@sys.packages/rabbit";
import {models, sequelize} from '@sys.packages/db';


export default () => async (ctx) => {
  const { Comment } = models;
  const { id } = ctx['params'];
  const { ...formData } = ctx['request']['body'];

  const transaction = await sequelize.transaction();

  const result = await Comment.create({
    productId: id,
    ...formData,
  }, {
    attributes: ['id', 'evaluation', 'person', 'comment', 'createdAt'],
  });

  await sendEvent(process.env['RABBIT_PRODUCT_SRV_EXCHANGE_COMMENT_CREATED'], JSON.stringify(result.toJSON()));

  await transaction.commit();

  ctx.body = {
    success: true,
    data: result.toJSON(),
  };
};
