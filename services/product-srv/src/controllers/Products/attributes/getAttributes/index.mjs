
import { models, sequelize } from '@sys.packages/db';


export default () => async (ctx) => {
  const where = {};
  const { typeId = null, categoryId = null } = ctx['request']['query'];

  const { Product, Type, Category, Units, Attribute, ProductAttribute } = models;

  if (typeId) {
    where['typeId'] = typeId;
  }

  if (categoryId) {
    where['categoryId'] = categoryId;
  }

  const result = await Attribute.findAll({
    row: true,
    group: ['Attribute.id', 'attribute.id', 'unit.value'],
    attributes: [
      'id',
      ['value', 'name'],
      [sequelize.col('unit.value'), 'units']
    ],
    include: [
      {
        model: Units,
        required: false,
        as: 'unit',
        attributes: []
      },
      {
        model: ProductAttribute,
        required: true,
        as: 'attribute',
        attributes: [],
        include: [
          {
            model: Product,
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
