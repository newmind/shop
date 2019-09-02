'use strict';

import { models } from '@sys.packages/db';


export default () => async (ctx) => {

  console.log(87236487642864);

  let where = {};
  let options = {};

  const { status = null, limit = null, offset = null } = ctx.request.query;
  const { SubProduct, Gallery } = models;

  if (status) {
    where['status'] = status;
  }

  if (limit) {
    options['limit'] = limit;
  }

  if (offset) {
    options['offset'] = offset;
  }

  const products = await SubProduct.findAndCountAll({
    attributes: ['id', 'name', 'brand', 'description', 'status', 'createdAt'],
    order: [['id', 'ASC']],
    distinct: true,
    subQuery: false,
    ...options,
    where: { ...where },
    include: [
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
