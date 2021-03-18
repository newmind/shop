
import { models, Sequelize } from '@sys.packages/db';

import promotionBuilder from "./promotionBuilder.mjs";


export default () => async (ctx) => {
  const { Promotion, ProductPromotion } = models;
  const { uuid } = ctx['request']['query'];

  const where = {};

  if (uuid) {
    where['productUuid'] = uuid;
  }

  const result = await Promotion.findAll({
    group: ['Promotion.id', 'products.id'],
    attributes: ['id', 'name', 'description', 'percent', 'dateFrom', 'dateTo'],
    where: {
      dateFrom: {
        [Sequelize.Op.lte]: new Date(),
      },
      dateTo: {
        [Sequelize.Op.gte]: new Date(),
      },
    },
    include: [
      {
        model: ProductPromotion,
        as: 'products',
        where: { ...where },
        attributes: ['productUuid'],
      }
    ],
  });

  ctx.body = {
    success: true,
    data: result.map((product) => promotionBuilder(product.toJSON())),
  };
};
