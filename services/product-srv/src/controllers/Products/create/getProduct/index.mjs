
import {models, Sequelize} from '@sys.packages/db';


export default async function updateProperties(uuid) {
  const { Product, Attribute, Units, Gallery, Currency, Category, Promotion, Type, Brand, ProductAttribute } = models;

  const product = await Product.findOne({
    where: { uuid },
    attributes: ['uuid', 'name', 'description', 'status', 'amount', 'fiscal', 'updatedAt'],
    order: [
      ['gallery', 'order', 'desc'],
    ],
    include: [
      {
        model: Brand,
        as: 'brands',
        attributes: ['id', 'value'],
        through: {
          attributes: [],
          order: [['order', 'asc']],
          as: 'brand',
        },
      },
      {
        model: Type,
        as: 'types',
        attributes: ['id', 'value'],
        through: {
          attributes: [],
          order: [['order', 'asc']],
          as: 'type',
        },
      },
      {
        model: Category,
        as: 'categories',
        attributes: ['id', 'value'],
        through: {
          attributes: [],
          order: [['order', 'asc']],
          as: 'category',
        },
      },
      {
        model: Promotion,
        required: false,
        as: 'promotions',
        attributes: ['uuid', 'name', 'percent'],
        where: {
          dateFrom: {
            [Sequelize.Op.lte]: new Date(),
          },
          dateTo: {
            [Sequelize.Op.gte]: new Date(),
          },
        },
        through: { attributes: [] },
      },
      {
        model: Currency,
        required: false,
        as: 'currency',
        attributes: ['uuid', 'value']
      },
      {
        model: ProductAttribute,
        required: false,
        as: 'attributes',
        attributes: ['value', 'order'],
        include: [
          {
            model: Attribute,
            attributes: ['id', 'value'],
            as: 'attribute',
            include: [
              {
                model: Units,
                required: false,
                as: 'unit',
                attributes: ['value']
              }
            ]
          }
        ]
      },
      {
        model: Gallery,
        as: 'gallery',
        attributes: ['uuid'],
      },
    ],
  });

  return product.toJSON();
}
