
import { models, sequelize } from '@sys.packages/db';


export default () => async (ctx) => {
  const where = {};

  const { Product, Category, Type } = models;
  const { brand = null, typeId = null } = ctx['request']['query'];

  if (brand) {
    where['brand'] = brand;
  }

  if (typeId) {
    where['typeId'] = typeId;
  }

  const result = await Category.findAll({
    row: true,
    group: ['Category.id'],
    order: [['value', 'asc']],
    attributes: ['id', 'value', [sequelize.fn('COUNT', sequelize.col('products.uuid')), 'count']],
    having: {
    },
    include: [
      {
        model: Product,
        required: true,
        as: 'products',
        attributes: [],
        through: { attributes: [] },
        include: [
          {
            model: Type,
            required: !! Object.keys(where).length,
            as: 'types',
            where: { id: where['typeId'] || [] },
            attributes: [],
            through: { attributes: [] },
          },
        ]
      }
    ],
  });

  ctx.body = {
    success: true,
    data: result,
  };
};
