
import request from "@sys.packages/request";

import { createHash } from 'crypto';


export default async function(data) {

  const body = {
    externalId: data['externalId'],
    amount: data['amount'],
    currency: data['amount'],
    description: data['description'],
    customerPhone: data['phone'],
    customerEmail: data['email'],
    customData: {
      name: data['name'],
      surname: data['surname'],
      address: data['address'].replace(/[,]/g, ''),
    },
    successUrl: `https://магазиночков.рф/order/${data['externalId']}`,
    failUrl: "https://магазиночков.рф/order",
    deliveryMethod: "EMAIL",
  };

  const bodyWithSalt = JSON.stringify(body) + process.env['PIKASSA_SECRET_KEY'];
  const hash = createHash('md5').update(bodyWithSalt).digest();
  const sign = hash.toString('base64');

  return await request({
    url: process.env['PIKASSA_API_URL'] + '/invoices',
    method: 'post',
    headers: {
      'X-Sign': sign,
      'X-Api-Key': process.env['PIKASSA_API_KEY'],
      'Content-Type': 'application/json; charset=utf-8',
    },
    data: body,
  });
}
