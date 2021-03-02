
import { models, sequelize } from '@sys.packages/db';


export default () => async (ctx) => {
  const where = {};
  const productWhere = {};
  const { typeId = null, categoryId = null, isView = null } = ctx['request']['query'];

  const { Product, Type, Category, Unit, Attribute, ProductAttribute } = models;

  if (isView !== null) {
    productWhere['isView'] = isView;
  }

  if (typeId) {
    where['typeId'] = typeId;
  }

  if (categoryId) {
    where['categoryId'] = categoryId;
  }

  const result = await Attribute.findAll({
    row: true,
    group: ['Attribute.id', 'unit.value'],
    attributes: [
      'id',
      ['value', 'name'],
      [sequelize.col('unit.value'), 'Unit']
    ],
    include: [
      {
        model: Unit,
        required: false,
        as: 'unit',
        attributes: []
      },
      {
        model: ProductAttribute,
        required: true,
        as: 'product_attribute',
        attributes: [],
        include: [
          {
            model: Product,
            where: { ...productWhere },
            as: 'product',
            required: false,
            attributes: [],
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
          }
        ]
      },
    ]
  });

  ctx.body = {
    success: true,
    data: result,
  };
};
