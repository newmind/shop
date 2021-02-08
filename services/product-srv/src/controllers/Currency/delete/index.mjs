
import { sendEvent } from "@sys.packages/rabbit2";
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Currency } = models;
  const { id } = ctx['request']['body'];

  await Currency.destroy({
    where: { id },
  });

  await sendEvent(process.env['EXCHANGE_CURRENCY_DELETE'], JSON.stringify(id));

  ctx.body = {
    success: true,
    data: id,
  };
};
