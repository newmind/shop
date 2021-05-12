
import { models } from '@sys.packages/db';
import { sendEvent } from '@sys.packages/rabbit';


export default () => async (ctx) => {
  const { Promotion } = models;
  const { id } = ctx['params'];
  const data = ctx['request']['body'];

  await Promotion.update(data, {
    where: { id },
  });

  const result = await Promotion.findOne({
    where: { id },
  });

  await sendEvent(process.env['EXCHANGE_PROMOTION_UPDATE'], JSON.stringify(result.toJSON()));

  ctx.body = {
    success: true,
    data: result.toJSON(),
  };
};
