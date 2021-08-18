
import { models } from '@sys.packages/db';

import shopBuilder from "./builder/shopBuilder.mjs";


export default async (uuid) => {
  const { Shop, Delivery, Payment } = models;

  const result = await Shop.findOne({
    where: {
      uuid,
    },
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

  return shopBuilder(result.toJSON());
}
