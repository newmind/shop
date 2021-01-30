
import { sendEvent } from '@sys.packages/rabbit2';
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Currency } = models;
  const { uuid } = ctx['params'];
  const formData = ctx['request']['body'];

  await Currency.update(formData, { where: { uuid }});

  const result = await Currency.findOne({
    where: { uuid },
    attributes: ['uuid', 'value', 'description'],
  });

  const currency = result.toJSON();

  await sendEvent(process.env['EXCHANGE_CURRENCY_UPDATE'], JSON.stringify(currency));

  ctx.body = {
    success: true,
    data: currency,
  };
};
