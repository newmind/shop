
import { models } from '@sys.packages/db';
import { sendEvent } from "@sys.packages/rabbit2";


export default () => async (ctx) => {
  const { Promotion } = models;
  const { uuid } = ctx['request']['body'];

  await Promotion.destroy({
    where: { uuid },
  });

  await sendEvent(process.env['EXCHANGE_PROMOTION_DELETE'], JSON.stringify(id));

  ctx.body = {
    success: true,
    data: uuid,
  };
};
