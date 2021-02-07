
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const where = {};

  const { Order, Currency, Payment, Delivery, Product, Status } = models;
  const { externalId } = ctx['request']['query'];

  if (externalId) {
    where['externalId'] = uuid;
  }

  const operations = await Order.findAndCountAll({
    where: { ...where },
    distinct: true,
    order: [['createdAt', 'desc']],
    attributes: ['externalId', 'customerId', 'price', 'createdAt', 'updatedAt'],
    include: [
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
        attributes: ['uuid', 'fiscal', 'price'],
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

  ctx.body = {
    success: true,
    data: operations['rows'],
    meta: {
      total: operations['count'],
    },
  };
};
