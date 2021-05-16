
import { models } from '@sys.packages/db';
import request from "@sys.packages/request";


export default async function updateProperties(uuid) {
  const { Product, Attribute, Unit, Gallery, Currency, Category, Type, Brand, Characteristic, CharacteristicAttribute } = models;

  const result = await Product.findOne({
    where: { uuid },
    attributes: ['uuid', 'name', 'description', 'isView', 'price', 'fiscal', 'updatedAt'],
    order: [
      // ['gallery', 'order', 'asc'],
      // ['characteristics', 'order', 'asc'],
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
