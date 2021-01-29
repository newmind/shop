
import request from '@sys.packages/request';
import { sendEvent } from '@sys.packages/rabbit2';
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { id } = ctx['request']['body'];
  const { Category } = models;

  await Category.destroy({ where: { id }});

  await sendEvent(process.env['EXCHANGE_CATEGORY_DELETE'], JSON.stringify(id));

  ctx.body = {
    success: true,
    data: id,
  };
};
