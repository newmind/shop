
import { models } from '@sys.packages/db';
import request from "@sys.packages/request";


export default async function updateProperties(uuid) {
  const { ProductShop, Product, Attribute, Unit, Gallery, Currency, Category, Type, Brand, Characteristic, CharacteristicAttribute, ProductOption } = models;

  const result = await Product.findOne({
    where: { uuid },
    attributes: ['uuid', 'name', 'description', 'isView', 'price', 'updatedAt'],
    order: [
      ['gallery', 'order', 'asc'],
      ['options', 'order', 'asc'],
      ['characteristics', 'order', 'asc'],
      ['characteristics', 'attributes', 'order', 'asc'],
    ],
    include: [
      {
        model: ProductShop,
        attributes: ['shopUuid', 'number'],
        as: 'shops',
      },
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
      },
    ],
  });

  const product = result.toJSON();

  const { data: promotions } = await request({
    url: process.env['PROMOTION_API_SRV'] + '/products',
    method: 'get',
    params: {
      uuid,
      onlyActive: false,
    },
  });

  product['promotions'] = promotions;

  return product;
}
