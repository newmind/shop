
import { models } from '@sys.packages/db';


export default async function updateProperties(uuid) {
  const { Product, Attribute, Units, Gallery, Currency, Category, Type } = models;

  const product = await Product.findOne({
    where: { uuid },
    attributes: ['uuid', 'brand', 'name', 'description', 'status', 'amount', 'saleAmount', 'fiscal', 'updatedAt'],
    include: [
      {
        model: Type,
        as: 'types',
        attributes: ['id', 'value'],
        through: { attributes: [] },
      },
      {
        model: Category,
        as: 'categories',
        attributes: ['id', 'value'],
        through: { attributes: [] },
      },
      {
        model: Currency,
        required: false,
        as: 'currency',
        attributes: ['uuid', 'value']
      },
      {
        model: Attribute,
        as: 'attributes',
        attributes: ['value'],
        through: { attributes: ['value', 'attributeId'], as: 'attribute' },
        include: [
          {
            model: Units,
            as: 'unit',
            attributes: ['value']
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
