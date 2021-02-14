
import { models, sequelize, Sequelize } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Promotion, ProductPromotion } = models;
  const { uuid } = ctx['request']['query'];

  const where = {};

  if (uuid) {
    where['productUuid'] = uuid;
  }

  const result = await Promotion.findAll({
    attributes: ['id', 'percent', 'dateFrom', 'dateTo' , [sequelize.col('products.productUuid'), 'productUuid']],
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
        where,
        attributes: [],
      }
    ],
  });

  ctx.body = {
    success: true,
    data: result.map((product) => product.toJSON()),
  };
};
