
import { sendEvent } from '@sys.packages/rabbit2';
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Units } = models;
  const { id } = ctx['params'];
  const data = ctx['request']['body'];

  await Units.update(data, {
    where: { id },
  });

  const result = await Units.findOne({
    attributes: ['id', 'value', 'description'],
    where: { id },
  });

  await sendEvent(process.env['EXCHANGE_UNIT_UPDATE'], JSON.stringify(result.toJSON()));

  ctx.body = {
    success: true,
    data: result.toJSON(),
  };
};
