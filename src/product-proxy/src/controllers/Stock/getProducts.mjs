'use strict';

import { models } from '@packages/db';


export default () => async (ctx) => {

  let where = {};
  let productWhere = {};
  const { categoryId, brand } = ctx.request.query;

  if (categoryId) {
    where['categoryId'] = categoryId;
  }

  if (brand) {
    productWhere['brand'] = brand;
  }

  const products = await models['Stock'].findAll({
    attributes: ['id', 'count', 'amount'],
    where: { ...where },
    order: [['id', 'DESC']],
    include: [
      {
        model: models['Currency'],
        required: false,
        as: 'currency',
        attributes: ['id', 'value']
      },
      {
        model: models['Category'],
        required: false,
        as: 'category',
        attributes: ['id', 'name']
      },
      {
        model: models['Comment'],
        required: false,
        as: 'comments',
        attributes: ['evaluation', 'person', 'comment'],
      },
      {
        model: models['Product'],
        attributes: ['id', 'name', 'brand', 'description', 'status'],
        required: true,
        as: 'product',
        where: { status: 1, ...productWhere },
        include: [
          {
            model: models['Attribute'],
            required: false,
            as: 'attributes',
            attributes: ['id', 'name', 'value'],
          },
          {
            model: models['Gallery'],
            required: false,
            as: 'gallery',
            attributes: ['file'],
          },
        ]
      }
    ],
  });

  ctx.body = {
    success: true,
    data: {
      products: products,
      count: products['count'],
    },
  };
};
