
import { sendEvent } from "@sys.packages/rabbit2";
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Currency } = models;
  const { uuid } = ctx['request']['body'];

  await Currency.destroy({
    where: { uuid },
  });

  await sendEvent(process.env['EXCHANGE_CURRENCY_DELETE'], JSON.stringify(uuid));

  ctx.body = {
    success: true,
    data: uuid,
  };
};
