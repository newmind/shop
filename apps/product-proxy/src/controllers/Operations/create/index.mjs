
import request from '@sys.packages/request';
import { UUID } from '@sys.packages/sys.utils';
import { sequelize, models } from '@sys.packages/db';
// import { sendEvent } from "@sys.packages/rabbit";

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
        address: fields['address'],
      },
      successUrl: "https://mysite.com/successUrl",
      failUrl: "https://mysite.com/failUrl",
      deliveryMethod: "URL",
    };

    const bodyWithSalt = JSON.stringify(body) + process.env['PIKASSA_SECRET_KEY'];
    const hash = createHash('md5').update(bodyWithSalt).digest("hex");
    const buff = new Buffer(hash);
    const sign = buff.toString('base64');

    const result = await request({
      url: process.env['PIKASSA_API_URL'] + '/invoices',
      method: 'post',
      json: true,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'X-Sign': sign,
        'X-Api-Key': process.env['PIKASSA_API_KEY'],
      },
      data: body,
    });

    console.log(result);


    // const { Operation, OperationStock } = models;
    //
    //
    // const resultId = await sequelize.transaction(async (transaction) => {
    //
    //   const { id } = await Operation.create({ externalId, ...fields }, { transaction });
    //
    //   const items = fields['items'].map((item) => ({ operationId: id, ...item }));
    //
    //   await OperationStock.bulkCreate(items, { transaction });
    //
    //   return externalId;
    // });

    // sendEvent(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_OPERATION_CREATED'], JSON.stringify(externalId));

    ctx.body = {
      success: true,
      data: {
        externalId,
      }
    };
  }
  catch (error) {

    console.log(error)

    ctx.status = 500;
    ctx.body = {
      success: false,
      error: {
        code: error.original.code,
        message: error.original.detail,
      }
    };
  }
};
