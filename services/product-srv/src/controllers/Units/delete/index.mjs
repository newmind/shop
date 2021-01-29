
import { sendEvent } from "@sys.packages/rabbit2";
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Units } = models;
  const { id } = ctx['request']['body'];

  await Units.destroy({
    where: { id },
  });

  await sendEvent(process.env['EXCHANGE_UNIT_DELETE'], JSON.stringify(id));

  ctx.body = {
    success: true,
    data: id,
  };
};
