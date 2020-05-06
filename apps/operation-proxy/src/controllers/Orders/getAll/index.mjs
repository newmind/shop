
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  try {
    const where = {};

    const { Order, OrderProducts, Product, Gallery, Currency } = models;
    const { externalId } = ctx['request']['query'];

    if (externalId) {
      where['externalId'] = externalId;
    }

    const operations = await Order.findAndCountAll({
      where: { ...where },
      distinct: true,
      order: [['createdAt', 'desc']],
      attributes: ['externalId', 'address', 'email', 'phone', 'name', 'surname', 'amount', 'pay', 'delivery', 'status', 'createdAt', 'updatedAt'],
      include: [
        {
          model: Currency,
          required: false,
          as: 'currency',
          attributes: ['uuid', 'value']
        },
        {
          model: OrderProducts,
          required: true,
          as: 'products',
          attributes: ['id', 'type', 'recipe', 'lens', 'amount'],
          include: [
            {
              model: Currency,
              required: false,
              as: 'currency',
              attributes: ['uuid', 'value']
            },
            {
              model: Product,
              attributes: ['uuid', 'name', 'brand'],
              required: true,
              as: 'product',
              include: [
                {
                  model: Currency,
                  required: false,
                  as: 'currency',
                  attributes: ['uuid', 'value']
                },
                {
                  model: Gallery,
                  required: false,
                  as: 'gallery',
                  attributes: ['externalId'],
                },
              ]
            }
          ]
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
  }
  catch(error) {

    ctx.status = 500;
    ctx.body = { code: '500', message: error['message'] };
  }
};
