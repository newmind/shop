
import {sendEvent} from "@sys.packages/rabbit2";
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Type, TypeCategory } = models;
  const { id } = ctx['request']['body'];

  await Type.destroy({ where: { id }});
  await TypeCategory.destroy({ where: { typeId: id }});

  await sendEvent(process.env['EXCHANGE_TYPE_DELETE'], JSON.stringify(id));

  ctx.body = {
    success: true,
    data: id,
  };
};
