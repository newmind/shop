
import { models, sequelize } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Product, Type } = models;

  const result = await Type.findAll({
    distinct: true,
    group: ['Type.id'],
    order: [['value', 'asc']],
    attributes: ['id', 'value', [sequelize.fn('COUNT', sequelize.col('products.uuid')), 'count']],
    include: [
      {
        model: Product,
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
