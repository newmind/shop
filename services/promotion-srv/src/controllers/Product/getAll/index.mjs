
import { models, Sequelize } from '@sys.packages/db';

import promotionBuilder from "./promotionBuilder.mjs";


export default () => async (ctx) => {
  const { Promotion, ProductPromotion } = models;
  const { uuid, onlyActive = 'true' } = ctx['request']['query'];

  const where = {};
  const promotionWhere = {};

  if (uuid) {
    where['productUuid'] = uuid;
  }

  if (onlyActive === 'true') {
    promotionWhere['dateFrom'] = {
      [Sequelize.Op.lte]: new Date(),
    };
    promotionWhere['dateTo'] = {
      [Sequelize.Op.gte]: new Date(),
    };
  }

  const result = await Promotion.findAll({
    group: ['Promotion.id', 'products.id'],
    attributes: ['id', 'name', 'description', 'percent', 'dateFrom', 'dateTo'],
    where: { ...promotionWhere },
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
