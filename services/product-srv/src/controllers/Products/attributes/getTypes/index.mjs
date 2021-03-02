
import { models, sequelize } from '@sys.packages/db';


export default () => async (ctx) => {
  const productWhere = {};

  const { Product, Type } = models;
  const { isView = null } = ctx['request']['query'];

  if (isView !== null) {
    productWhere['isView'] = isView;
  }

  const result = await Type.findAll({
    distinct: true,
    group: ['Type.id'],
    order: [['value', 'asc']],
    attributes: ['id', 'value', [sequelize.fn('COUNT', sequelize.col('products.uuid')), 'count']],
    include: [
      {
        model: Product,
        where: { ...productWhere },
        as: 'products',
        attributes: [],
        through: { attributes: [] },
      }
    ],
  });

  ctx.body = {
    success: true,
    data: result,
  };
};
