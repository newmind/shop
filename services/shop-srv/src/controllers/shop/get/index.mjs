
import { models } from '@sys.packages/db';

import shopBuilder from './builder/shopBuilder.mjs';


export default () => async (ctx) => {
  const { Shop, Delivery, Payment } = models;

  const where = {};
  const query = ctx['query'];

  if (query['uuid']) {
    where['uuid'] = query['uuid'];
  }

  const shops = await Shop.findAll({
    where: {
      ...where,
    },
    order: [
      ['createdAt', 'asc']
    ],
    include: [
      {
        model: Delivery,
        as: 'deliveries',
        through: {
          attributes: ['isUse'],
          order: [['deliveryCode', 'asc']],
          as: 'status',
        },
      },
      {
        model: Payment,
        as: 'payments',
        through: {
          attributes: ['isUse'],
          order: [['paymentCode', 'asc']],
          as: 'status',
        },
      }
    ]
  });

  ctx.body = {
    success: true,
    data: shops.map((item) => shopBuilder(item.toJSON())),
  };
};
