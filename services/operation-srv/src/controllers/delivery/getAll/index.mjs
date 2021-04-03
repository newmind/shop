
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const where = {};
  const { Delivery } = models;
  const { isUse } = ctx['query'];

  if (isUse) {
    where['isUse'] = isUse;
  }

  const result = await Delivery.findAll({
    attributes: ['code', 'name'],
    where: { ...where },
  });

  const deliveries = result.map((item) => item.toJSON());

  ctx.body = {
    success: true,
    data: deliveries,
  };
};
