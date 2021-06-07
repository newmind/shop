
import moment from '@packages/moment';

import request from "@sys.packages/request";
import { models, Sequelize } from '@sys.packages/db';

import promotionBuilder from "./promotionBuilder.mjs";


export default () => async (ctx) => {
  let sorting = ['price', 'desc'];
  let where = {};
  let whereForTypes = {};
  let whereForCategories = {};
  let whereForBrands = {};
  let whereForOptions = {};
  let offset = {};
  let options = {};

  const { Op } = Sequelize;
  const { Product, Currency, Attribute, Category, Brand, Type, Characteristic, CharacteristicAttribute, Unit, Gallery, Comment, ProductOption } = models;
  const {
    fiscal = null,
    limit = null,
    skip = null,
    take = null,
    uuid = null,
    categoryId = null,
    brandId = null,
    amountFrom = null,
    amountTo = null,
    typeId = null,
    isView = null,
    sort = '',
    vendor = null,
  } = ctx['request']['query'];

  if (sort) {
    const item = sort.split(':');
    sorting[0] = item[0];
    sorting[1] = item[1];
  }

  if (isView !== null) {
    where['isView'] = isView;
  }

  if (vendor) {
    whereForOptions['vendor'] = vendor;
  }

  if (fiscal) {
    where['fiscal'] = fiscal;
  }

  if (uuid) {
    where['uuid'] = uuid;
  }

  if (brandId) {
    whereForBrands['id'] = brandId;
  }

  if (typeId) {
    whereForTypes['id'] = typeId;
  }

  if (categoryId) {
    whereForCategories['id'] = categoryId;
  }

  if (amountFrom && ! amountTo) {
    where['price'] = {
      [Op.gte]: Number(amountFrom)
    };
  }
  else if (amountTo && ! amountFrom) {
    where['price'] = {
      [Op.lte]: Number(amountTo)
    };
  }
  else if (amountFrom && amountTo) {
    where['price'] = {
      [Op.between]: [Number(amountFrom), Number(amountTo)]
    };
  }

  if (limit) {
    options['limit'] = Number(limit);
  }

  if (skip && take) {
    offset['offset'] = Number(skip);
    offset['limit'] = Number(take);
  }

  let result;

  if ( !! Object.keys(whereForOptions).length) {
    result = await ProductOption.findAndCountAll({
      ...options,
      ...offset,
      distinct: true,
      where: { ...whereForOptions, },
      order: [
        ['order', 'asc'],
        ['product', 'gallery', 'order', 'asc'],
        ['product', 'options', 'order', 'asc'],
        ['product', 'comments', 'createdAt', 'desc'],
        ['product', 'characteristics', 'order', 'asc'],
        ['product', 'characteristics', 'attributes', 'order', 'asc'],
      ],
      include: [
        {
          model: Product,
          as: 'product',
          where: { ...where },
          attributes: ['uuid', 'name', 'description', 'price', 'fiscal', 'isView', 'createdAt'],
          order: [
            sorting,
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
            },
            {
              model: Comment,
              as: 'comments',
              attributes: ['id', 'evaluation', 'person', 'comment', 'createdAt'],
            }
          ],
        },
      ]
    });
  }
  else {
    result = await Product.findAndCountAll({
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
        },
        {
          model: Comment,
          as: 'comments',
          attributes: ['id', 'evaluation', 'person', 'comment', 'createdAt'],
        }
      ],
    });
  }

  let products;

  if ( !! Object.keys(whereForOptions).length) {
    products = result['rows'].map((option) => {
      const json = option.toJSON();
      const optionThere = { ...json };
      delete optionThere['product'];
      json['product']['options'] = [optionThere];
      return json['product'];
    });
  }
  else {
    products = result['rows'].map((product) => product.toJSON());
  }

  const productUuids = products.map((product) => product['uuid']);

  if ( !! productUuids.length) {

    const { data: promotions } = await request({
      url: process.env['PROMOTION_API_SRV'] + '/products',
      method: 'get',
      params: {
        uuid: productUuids,
        onlyActive: false,
      },
    });

    products = products.map((product) => {
      product['promotions'] = [];
      for (let index in promotions) {
        if (promotions.hasOwnProperty(index)) {
          const promotion = promotions[index];
          if ( !!~ promotion['products'].indexOf(product['uuid'])) {
            if (moment().isBetween(promotion['dateFrom'], promotion['dateTo'], undefined, '[]')) {
              if ( ! product['prevPrice']) {
                product['prevPrice'] = product['price'];
              }
              product['price'] = product['price'] - Math.floor(product['price'] * promotion['percent'] / 100);
            }
            product['promotions'] = [...product['promotions'], promotionBuilder(promotion)];
          }
        }
      }
      return product;
    });
  }

  ctx.body = {
    success: true,
    data: products,
    meta: {
      total: result['count'],
    },
  };
};
