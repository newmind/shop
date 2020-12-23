
import { sendEvent } from "@sys.packages/rabbit";
import { sequelize, models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Category } = models;
  const formData = ctx['request']['body'];

  const transaction = await sequelize.transaction();

  const result = await Category.create(formData, {
    transaction
  });

  await sendEvent(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CATEGORY_CREATED'], JSON.stringify(result.toJSON()));

  await transaction.commit();

  ctx.body = {
    success: true,
    data: result.toJSON(),
  };
};
