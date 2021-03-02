
import { models, sequelize } from '@sys.packages/db';


export default () => async (ctx) => {
  let where = {};
  let productWhere = {};

  const { Brand, Product, Type, Category } = models;
  const { typeId = null, categoryId = null, isView = null } = ctx['request']['query'];

  if (isView !== null) {
    productWhere['isView'] = isView;
  }

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
    attributes: ['id', 'value', [sequelize.fn('COUNT', sequelize.col('products.uuid')), 'count']],
    include: [
      {
        model: Product,
        required: true,
        as: 'products',
        where: { ...productWhere },
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
