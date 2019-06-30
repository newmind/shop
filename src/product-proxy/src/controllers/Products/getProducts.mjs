'use strict';

import { models } from '@packages/db';


export default () => async (ctx) => {

  let where = {};
  let options = {};
  const { status = null, limit = null, offset = null } = ctx.request.query;

  if (status) {
    where['status'] = status;
  }

  if (limit) {
    options['limit'] = limit;
  }

  if (offset) {
    options['offset'] = offset;
  }

  const products = await models['Product'].findAndCountAll({
    attributes: ['id', 'name', 'brand', 'description', 'status', 'createdAt'],
    order: [['id', 'ASC']],
    distinct: true,
    subQuery: false,
    ...options,
    where: { ...where },
    include: [
      {
        model: models['Attribute'],
        required: false,
        as: 'attributes',
        attributes: ['id', 'name', 'value'],
        include: [
          {
            model: models['Units'],
            required: false,
            as: 'unit',
            attributes: ['id', 'value']
          }
        ]
      },
      {
        model: models['Gallery'],
        required: false,
        as: 'gallery',
        attributes: ['file'],
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
