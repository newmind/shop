
import { models } from '@sys.packages/db';
import { sendEvent } from "@sys.packages/rabbit";


export default () => async (ctx) => {
  const { Promotion } = models;
  const { id } = ctx['request']['body'];

  await Promotion.destroy({
    where: { id },
  });

  await sendEvent(process.env['EXCHANGE_PROMOTION_DELETE'], JSON.stringify(id));

  ctx.body = {
    success: true,
    data: id,
  };
};
