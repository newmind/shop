
import { models } from "@sys.packages/db";


export default async function(options) {
  const { Product, Currency, Attribute, Category, Brand, Type, Characteristic, CharacteristicAttribute, Unit, Gallery, Comment, ProductOption } = models;

  return await Product.findAndCountAll({
    attributes: ['uuid', 'name', 'description', 'price', 'fiscal', 'isView', 'createdAt'],
    ...options,
    ...offset,
    distinct: true,
    where: { ...where },
    order: [
      sorting,
      ['options', 'order', 'asc'],
      ['gallery', 'order', 'asc'],
      ['options', 'order', 'asc'],
      ['comments', 'createdAt', 'desc'],
      ['characteristics', 'order', 'asc'],
      ['characteristics', 'attributes', 'order', 'asc'],
    ],
    include: [
      {
        model: Brand,
        required: !! whereForBrands['id'],
        as: 'brands',
        where: { ...whereForBrands },
        attributes: ['id', 'value'],
        through: {
          attributes: [],
          order: [['order', 'asc']],
          as: 'brand',
        },
      },
      {
        model: Type,
        required: !! whereForTypes['id'],
        as: 'types',
        where: { ...whereForTypes },
        attributes: ['id', 'value'],
        through: {
          attributes: [],
          order: [['order', 'asc']],
          as: 'type',
        },
      },
      {
        model: Category,
        required: !! whereForCategories['id'],
        as: 'categories',
        where: { ...whereForCategories },
        attributes: ['id', 'value'],
        through: {
          attributes: [],
          order: [['order', 'asc']],
          as: 'category',
        },
      },
      {
        model: Currency,
        required: false,
        as: 'currency',
        attributes: ['code', 'value']
      },
      {
        model: Characteristic,
        required: false,
        as: 'characteristics',
        attributes: ['id', 'name', 'order'],
        include: [
          {
            model: CharacteristicAttribute,
            required: false,
            as: 'attributes',
            attributes: ['value', 'order', 'use'],
            include: [
              {
                model: Attribute,
                attributes: ['id', 'value'],
                as: 'attribute',
                include: [
                  {
                    model: Unit,
                    required: false,
                    as: 'unit',
                    attributes: ['value']
                  }
                ]
              }
            ]
          },
        ]
      },
      {
        model: Gallery,
        as: 'gallery',
        attributes: ['uuid'],
      },
      {
        model: ProductOption,
        as: 'options',
        where: {
          vendor: ['AR-SH-0001', 'AR-SH-0002'],
        }
      },
      {
        model: Comment,
        as: 'comments',
        attributes: ['id', 'evaluation', 'person', 'comment', 'createdAt'],
      }
    ],
  });
}
