
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const where = {};

  const { Promotion, ProductPromotion } = models;
  const { id } = ctx['params'];
  const data = ctx['request']['body'];

  await Promotion.update(data, {
    where: { id },
  });

  const result = await Promotion.findOne({
    attributes: ['id', 'percent', 'dateFrom', 'dateTo'],
    where: {

    },
    include: [
      {
        model: ProductPromotion,
        as: 'products',
        where,
        attributes: [],
      }
    ],
  });

  ctx.body = {
    success: true,
    data: result.toJSON(),
  };
};
