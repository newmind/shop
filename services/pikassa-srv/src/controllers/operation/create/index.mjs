
import request from "@sys.packages/request";

import { createHash } from 'crypto';


export default () => async (ctx) => {
  const { body } = ctx['request'];

  const requestBody = {
    externalId: body['externalId'],
    amount: body['amount'],
    currency: body['currency'],
    description: body['description'],
    customerPhone: body['phone'],
    customerEmail: body['email'],
    customData: {
      name: body['name'],
      surname: body['surname'],
      address: body['address'].replace(/[,]/g, ''),
    },
    deliveryMethod: "URL",
  };

  const bodyWithSalt = JSON.stringify(requestBody) + process.env['PIKASSA_SECRET_KEY'];
  const hash = createHash('md5').update(bodyWithSalt).digest();
  const sign = hash.toString('base64');

  ctx.body = await request({
    url: process.env['PIKASSA_API_URL'] + '/invoices',
    method: 'post',
    headers: {
      'X-Sign': sign,
      'X-Api-Key': process.env['PIKASSA_API_KEY'],
      'Content-Type': 'application/json; charset=utf-8',
    },
    data: requestBody,
  });
}
