
import { models } from '@sys.packages/db';
import request from '@sys.packages/request';


export default async function(orderId, items) {
  const { Product } = models;

  const { data } = await request({
    url: process.env['PRODUCT_API_SRV'] + '/products',
    params: {
      vendor: items.map((item) => item[2]['vendor']),
    }
  });

  const products = data.map((item) => {
    return  {
      orderId,
      uuid: item['uuid'],
      price: item['price'],
      currencyCode: item['currency']['code'],
      count: items.find((i) => i[0] === item['uuid'])[1],
      optionName: item['options'][0]['name'],
      optionVendor: item['options'][0]['vendor'],
    }
  });

  await Product.bulkCreate(products);
}
