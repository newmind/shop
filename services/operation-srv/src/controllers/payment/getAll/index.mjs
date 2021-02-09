
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Payment } = models;

  const result = await Payment.findAll({
    attributes: ['code', 'name'],
  });

  const payments = result.map((item) => item.toJSON());

  ctx.body = {
    success: true,
    data: payments,
  };
};
