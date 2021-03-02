
import { models, sequelize } from '@sys.packages/db';


export default () => async (ctx) => {
  const where = {};
  const productWhere = {};

  const { Product, Type, Category, Brand } = models;
  const { isView = null, categoryId = null, brandId } = ctx['request']['query'];

  if (isView !== null) {
    productWhere['isView'] = isView;
  }

  if (categoryId) {
    where['categoryId'] = categoryId;
  }

  if (brandId) {
    where['brandId'] = brandId;
  }

  const result = await Type.findAll({
    distinct: true,
    group: ['Type.id'],
    order: [['value', 'asc']],
    attributes: ['id', 'value', [sequelize.fn('COUNT', sequelize.col('products.uuid')), 'count']],
    include: [
      {
        model: Product,
        required: false,
        where: { ...productWhere },
        as: 'products',
        attributes: [],
        through: { attributes: [] },
        include: [
          {
            model: Category,
            required: !! where['categoryId'],
            as: 'categories',
            where: { id: where['categoryId'] || [] },
            attributes: [],
            through: { attributes: [] },
          },
          {
            model: Brand,
            required: !! where['brandId'],
            as: 'brands',
            where: { id: where['brandId'] || [] },
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
