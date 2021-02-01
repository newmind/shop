
import { models, sequelize } from '@sys.packages/db';


export default () => async (ctx) => {
  let where = {};

  const { Brand, Product, Type, Category } = models;
  const { categoryId = null, typeId = null } = ctx['request']['query'];

  if (typeId) {
    where['typeId'] = typeId;
  }

  if (categoryId) {
    where['categoryId'] = categoryId;
  }

  const result = await Brand.findAll({
    row: true,
    group: ["Brand.id"],
    order: [['value', 'asc']],
    attributes: ['id', 'value', [sequelize.fn('COUNT', sequelize.col('Brand.id')), 'count']],
    include: [
      {
        model: Product,
        required: !! Object.keys(where).length,
        as: 'products',
        attributes: [],
        through: { attributes: [] },
        include: [
          {
            model: Type,
            required: !! where['typeId'],
            as: 'types',
            where: { id: where['typeId'] || [] },
            attributes: [],
            through: { attributes: [] },
          },
          {
            model: Category,
            required: !! where['categoryId'],
            as: 'categories',
            where: { id: where['categoryId'] || [] },
            attributes: [],
            through: { attributes: [] },
          },
        ]
      },
    ]
  });

  ctx.body = {
    success: true,
    data: result,
  };
};
