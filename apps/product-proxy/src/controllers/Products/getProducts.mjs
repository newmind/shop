'use strict';

import { models } from '@sys.packages/db';


export default () => async (ctx) => {

  let where = {};
  let options = {};
  const { status = null, limit = null, offset = null } = ctx.request.query;
  const { Product, Attribute, Units, Gallery } = models;

  if (status) {
    where['status'] = status;
  }

  if (limit) {
    options['limit'] = limit;
  }

  if (offset) {
    options['offset'] = offset;
  }

  const products = await Product.findAndCountAll({
    attributes: ['id', 'name', 'brand', 'description', 'status', 'createdAt'],
    order: [
      ['id', 'asc'],
      ['gallery', 'id', 'asc']
    ],
    distinct: true,
    subQuery: false,
    ...options,
    where: { ...where },
    include: [
      {
        model: Attribute,
        required: false,
        as: 'attributes',
        attributes: ['id', 'name', 'value'],
        include: [
          {
            model: Units,
            required: false,
            as: 'unit',
            attributes: ['id', 'value']
          }
        ]
      },
      {
        model: Gallery,
        required: false,
        as: 'gallery',
        attributes: ['id'],
      },
    ],
  });

  ctx.body = {
    success: true,
    data: {
      products: products['rows'],
      count: products['count'],
    },
  };
};
