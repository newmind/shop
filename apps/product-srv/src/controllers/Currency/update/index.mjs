
import { sendEvent } from '@sys.packages/rabbit';
import { sequelize, models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Currency } = models;
  const { uuid } = ctx['params'];
  const formData = ctx['request']['body'];

  const transaction = await sequelize.transaction();

  await Currency.update(formData, {
    where: { uuid },
    transaction
  });

  const result = await Currency.findOne({
    where: { uuid },
    transaction
  });

  await sendEvent(process.env['RABBIT_PRODUCT_SRV_EXCHANGE_CURRENCY_UPDATED'], JSON.stringify(result.toJSON()));

  await transaction.commit();

  ctx.body = {
    success: true,
    data: result.toJSON(),
  };
};
