
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Payment } = models;
  const { code } = ctx['params'];
  const data = ctx['request']['body'];

  await Payment.update(data, { where: { code }});

  const result = await Payment.findOne({
    order: [
      ['order', 'asc']
    ],
    where: { code },
    attributes: ['code', 'name', 'description', 'isUse'],
  });

  const payment = result.toJSON();

  ctx.body = {
    success: true,
    data: payment,
  };
};
