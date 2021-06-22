
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Delivery } = models;
  const { code } = ctx['params'];
  const data = ctx['request']['body'];

  await Delivery.update(data, { where: { code }});

  const result = await Delivery.findOne({
    order: [
      ['order', 'asc']
    ],
    where: { code },
    attributes: ['code', 'name', 'description', 'isUse'],
  });

  const delivery = result.toJSON();

  ctx.body = {
    success: true,
    data: delivery,
  };
};
