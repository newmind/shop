
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Promotion } = models;

  const result = await Promotion.findAll({
    order: [
      ['dateFrom', 'asc'],
    ],
  });

  ctx.body = {
    success: true,
    data: result.map((promo) => promo.toJSON()),
  };
};
