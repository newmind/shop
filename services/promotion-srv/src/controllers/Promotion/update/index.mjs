
import { models } from '@sys.packages/db';
import { sendEvent } from '@sys.packages/rabbit2';


export default () => async (ctx) => {
  const { Promotion } = models;
  const { uuid } = ctx['params'];
  const data = ctx['request']['body'];

  await Promotion.update(data, {
    where: { uuid },
  });

  const result = await Promotion.findOne({
    where: { uuid },
  });

  await sendEvent(process.env['EXCHANGE_PROMOTION_UPDATE'], JSON.stringify(result.toJSON()));

  ctx.body = {
    success: true,
    data: result.toJSON(),
  };
};
