
import { models } from '@sys.packages/db';
import { sendEvent } from "@sys.packages/rabbit";


export default () => async (ctx) => {
  const { Promotion } = models;
  const formData = ctx['request']['body'];

  const { id } = await Promotion.create(formData);

  const result = await Promotion.findOne({
    where: { id },
  });

  await sendEvent(process.env['EXCHANGE_PROMOTION_CREATE'], JSON.stringify(result.toJSON()));

  ctx.body = {
    success: true,
    data: result.toJSON(),
  };
};
