
import { sendEvent } from "@sys.packages/rabbit2";
import { models, sequelize } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Comment } = models;
  const { id } = ctx['request']['body'];

  const transaction = await sequelize.transaction();

  await Comment.destroy({
    where: { id }
  });

  await transaction.commit();

  await sendEvent(process.env['RABBIT_PRODUCT_SRV_EXCHANGE_COMMENT_DELETED'], JSON.stringify(id));

  ctx.body = {
    success: true,
    data: id,
  };
};
