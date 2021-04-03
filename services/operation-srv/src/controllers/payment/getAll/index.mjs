
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const where = {};
  const { Payment } = models;
  const { isUse } = ctx['query'];

  if (isUse) {
    where['isUse'] = isUse;
  }

  const result = await Payment.findAll({
    attributes: ['code', 'name'],
    where: { ...where },
  });

  const payments = result.map((item) => item.toJSON());

  ctx.body = {
    success: true,
    data: payments,
  };
};
