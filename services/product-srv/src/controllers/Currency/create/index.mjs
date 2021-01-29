
import { sendEvent } from "@sys.packages/rabbit2";
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

  await transaction.commit();

  await sendEvent(process.env['RABBIT_PRODUCT_SRV_EXCHANGE_CURRENCY_CREATED'], JSON.stringify(result.toJSON()));

  ctx.body = {
    success: true,
    data: result.toJSON(),
  };
};
