
import { models } from '@sys.packages/db';
import request from '@sys.packages/request';


export default async function(orderId, items) {
  const { Product } = models;

  const { data } = await request({
    url: process.env['PRODUCT_API_SRV'] + '/products',
    params: {
      uuid: items.map((item) => item[0]),
    }
  });

  const products = data.map((item) => ({
    orderId,
    uuid: item['uuid'],
    fiscal: item['fiscal'],
    price: item['price'],
    currencyCode: item['currency']['code'],
    count: items.find((i) => i[0] === item['uuid'])[1],
  }));

  await Product.bulkCreate(products);
}
