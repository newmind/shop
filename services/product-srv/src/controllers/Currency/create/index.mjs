
import { sendEvent } from "@sys.packages/rabbit2";
import { models } from '@sys.packages/db';
import { UUID } from '@sys.packages/utils';


export default () => async (ctx) => {
  const { Currency } = models;
  const formData = ctx['request']['body'];
  const uuid = UUID();

  await Currency.create({ uuid, ...formData });

  const result = await Currency.findOne({
    where: { uuid },
    attributes: ['uuid', 'value', 'description'],
  });

  const currency = result.toJSON();

  await sendEvent(process.env['EXCHANGE_CURRENCY_CREATE'], JSON.stringify(currency));

  ctx.body = {
    success: true,
    data: currency,
  };
};
