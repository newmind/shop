
import { models } from '@sys.packages/db';


export default async function(orderId) {
  const { Order, Currency, Payment, Delivery, Product, Status, OnlinePayment } = models;

  const result = await Order.findOne({
    where: { id: orderId },
    attributes: ['externalId', 'customerId', 'price', 'createdAt', 'updatedAt'],
    include: [
      {
        model: OnlinePayment,
        required: false,
        as: 'onlinePayment',
        attributes: ['paymentLink'],
      },
      {
        model: Currency,
        required: true,
        as: 'currency',
        attributes: ['code', 'value'],
      },
      {
        model: Product,
        required: true,
        as: 'products',
        attributes: ['uuid', 'fiscal', 'price', 'count'],
        include: [
          {
            model: Currency,
            required: true,
            as: 'currency',
            attributes: ['code', 'value'],
          },
        ],
      },
      {
        model: Payment,
        required: true,
        as: 'payment',
        attributes: ['code', 'name'],
      },
      {
        model: Delivery,
        required: true,
        as: 'delivery',
        attributes: ['code', 'name'],
      },
      {
        model: Status,
        required: true,
        as: 'status',
        attributes: ['code', 'name'],
      }
    ]
  });

  return result.toJSON();
}
