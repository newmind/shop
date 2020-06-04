
import request from '@sys.packages/request';
import { UUID } from '@sys.packages/sys.utils';
import { sendEvent } from "@sys.packages/rabbit";
import { sequelize, models } from '@sys.packages/db';

import { createHash } from 'crypto';


export default () => async (ctx) => {
  try {
    const externalId = UUID();
    const fields = ctx['request']['body'];

    const body = {
      externalId,
      amount: fields['amount'],
      currency: 'RUB',
      description: 'test',
      customerPhone: fields['phone'],
      customerEmail: fields['email'],
      customData: {
        name: fields['name'],
        surname: fields['surname'],
        address: fields['address'].replace(/[,]/g, ''),
      },
      successUrl: `https://магазиночков.рф/order/${externalId}`,
      failUrl: "https://магазиночков.рф/order",
      deliveryMethod: "EMAIL",
    };

    const bodyWithSalt = JSON.stringify(body) + process.env['PIKASSA_SECRET_KEY'];
    const hash = createHash('md5').update(bodyWithSalt).digest();
    const sign = hash.toString('base64');

    const invoice = await request({
      url: process.env['PIKASSA_API_URL'] + '/invoices',
      method: 'post',
      headers: {
        'X-Sign': sign,
        'X-Api-Key': process.env['PIKASSA_API_KEY'],
        'Content-Type': 'application/json; charset=utf-8',
      },
      data: body,
    });

    console.log(fields);

    const { Order, OrderProducts, Currency, Product, Gallery, Status, Prescription } = models;
    const transaction = await sequelize.transaction();

    const { id } = await Order.create({
      externalId,
      currencyId: fields['items'][0]['currencyId'],
      invoiceId: invoice['data']['uuid'],
      paymentLink: invoice['data']['paymentLink'],
      statusCode: 1,
      pay: fields['pay'],
      name: fields['name'],
      phone: fields['phone'],
      email: fields['email'],
      surname: fields['surname'],
      address: fields['address'],
      delivery: fields['delivery'],
      amount: fields['amount'],
    }, {
      transaction,
    });

    const products = fields['items'];
    for (let index in products) {
      if (products.hasOwnProperty(index)) {
        const product = products[index];
        const { id: orderProductId } = await OrderProducts.create({
          orderId: id,
          productId: product['productId'],
          currencyId: product['currencyId'],
          type: product['type'],
          amount: product['amount'],
        }, {
          transaction
        });

        if (product['recipe']) {
          await Prescription.create({
            orderId: orderProductId,
            ...product['recipe'],
          }, {
            transaction,
          });
        }
      }
    }

    await transaction.commit();

    const operations = await Order.findAll({
      where: { externalId },
      order: [['createdAt', 'desc']],
      attributes: ['externalId', 'address', 'email', 'phone', 'name', 'surname', 'amount', 'pay', 'delivery', 'createdAt', 'updatedAt'],
      include: [
        {
          model: Currency,
          required: false,
          as: 'currency',
          attributes: ['uuid', 'value']
        },
        {
          model: Status,
          required: false,
          as: 'status',
          attributes: ['code', 'name']
        },
        {
          model: OrderProducts,
          required: true,
          as: 'products',
          attributes: ['id', 'type', 'amount'],
          include: [
            {
              model: Prescription,
              required: false,
              as: 'recipe',
              attributes: ['PDLeft', 'PDRight', 'sphRight', 'sphLeft', 'cylRight', 'cylLeft', 'axisRight', 'axisLeft', 'addRight', 'addLeft']
            },
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

    await sendEvent(process.env['RABBIT_OPERATION_PROXY_EXCHANGE_ORDER_CREATED'], JSON.stringify(operations[0]));

    console.log(operations[0].toJSON()['products']);

    ctx.status = 500;
    ctx.body = {
      success: true,
      data: invoice['data'],
    };
  }
  catch (error) {

    ctx.status = 500;
    ctx.body = {
      success: false,
      error: {
        code: 500,
        message: error['message'],
      }
    };
  }
};
