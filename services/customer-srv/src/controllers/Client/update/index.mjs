
// import { sendEvent } from '@sys.packages/rabbit';
import { sequelize, models } from '@sys.packages/db';


export default () => async (ctx) => {
  try {
    const { externalId } = ctx['params'];
    const fields = ctx['request']['body'];

    const { Order, Currency, Status, OrderProducts, Product, Gallery } = models;
    const transaction = await sequelize.transaction();

    await Order.update({
      statusCode: fields['statusCode'],
      pay: fields['pay'],
      name: fields['name'],
      phone: fields['phone'],
      email: fields['email'],
      surname: fields['surname'],
      address: fields['address'],
      delivery: fields['delivery'],
      amount: fields['amount'],
    }, {
      where: { externalId, },
      transaction,
    });

    await transaction.commit();

    const operations = await Order.findAll({
      where: { externalId },
      order: [['createdAt', 'desc']],
      attributes: ['externalId', 'address', 'email', 'phone', 'name', 'surname', 'amount', 'pay', 'delivery', 'createdAt', 'updatedAt'],
      include: [
        {
          model: Currency,
          required: true,
          as: 'currency',
          attributes: ['uuid', 'value']
        },
        {
          model: Status,
          required: true,
          as: 'status',
          attributes: ['code', 'name']
        },
        {
          model: OrderProducts,
          required: true,
          as: 'products',
          attributes: ['id', 'type', 'recipe', 'lens', 'amount'],
          include: [
            {
              model: Currency,
              required: true,
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
      data: operations[0] ? operations[0].toJSON() : '4567890',
    };
  }
  catch(error) {

    ctx.status = 500;
    ctx.body = {
      success: false,
      error: {
        code: '500',
        message: error['message'],
      },
    };
  }
};
