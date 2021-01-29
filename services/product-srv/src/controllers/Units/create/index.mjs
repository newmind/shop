
import { sendEvent } from "@sys.packages/rabbit2";
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Units } = models;
  const formData = ctx['request']['body'];

  const { id } = await Units.create(formData);

  const result = await Units.findOne({
    attributes: ['id', 'value', 'description'],
    where: { id },
  });

  await sendEvent(process.env['EXCHANGE_UNIT_CREATE'], JSON.stringify(result.toJSON()));

  ctx.body = {
    success: true,
    data: result.toJSON(),
  };
};
