
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
      failUrl: "https://магазиночков.рф",
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

    const { Order, OrderProducts } = models;
    const transaction = await sequelize.transaction();

    const { id } = await Order.create({
      externalId,
      invoiceId: invoice['data']['uuid'],
      paymentLink: invoice['data']['paymentLink'],
      status: fields['status'],
      pay: fields['pay'],
      name: fields['name'],
      phone: fields['phone'],
      email: fields['email'],
      surname: fields['surname'],
      address: fields['address'],
      delivery: fields['delivery'],
      amount: fields['amount'],
    }, {
      transaction
    });

    const items = fields['items'].map((item) => ({
      orderId: id,
      productId: item['uuid'],
      ...item,
    }));

    await OrderProducts.bulkCreate(items, { transaction });

    await sendEvent(process.env['RABBIT_OPERATION_PROXY_EXCHANGE_ORDER_CREATED'], JSON.stringify(externalId));

    await transaction.commit();

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
