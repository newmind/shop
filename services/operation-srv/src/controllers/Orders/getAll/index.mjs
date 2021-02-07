
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  try {
    const where = {};

    const { Order, Currency, Product, Gallery } = models;
    const { uuid } = ctx['request']['query'];

    if (uuid) {
      where['uuid'] = uuid;
    }

    const operations = await Order.findAndCountAll({
      where: { ...where },
      distinct: true,
      order: [['createdAt', 'desc']],
      attributes: ['uuid', 'amount', 'finalAmount', 'description', 'createdAt', 'updatedAt'],
      include: [
        {
          model: Currency,
          required: true,
          as: 'currency',
          attributes: ['uuid', 'value'],
        },
        {
          model: Product,
          required: true,
          as: 'products',
          attributes: ['name'],
          include: [
            {
              model: Gallery,
              as: 'gallery',
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
