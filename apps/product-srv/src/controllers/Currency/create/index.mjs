
import { sendEvent } from "@sys.packages/rabbit";
import { sequelize, models } from '@sys.packages/db';
import { UUID } from '@sys.packages/sys.utils';


export default () => async (ctx) => {
  const { Currency } = models;
  const formData = ctx['request']['body'];
  const uuid = UUID();

  const transaction = await sequelize.transaction();

  const result = await Currency.create({
    uuid,
    ...formData
  }, {
    transaction,
  });

  await sendEvent(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CURRENCY_CREATED'], JSON.stringify(result.toJSON()));

  await transaction.commit();

  ctx.body = {
    success: true,
    data: result.toJSON(),
  };
};
