
import request from "@sys.packages/request";


export default () => async (ctx) => {
  const data = ctx['request']['body'];

  let address = data['address'].trim();

  if (data['house']) {
    address += `, корп.${data['house']}`;
  }
  if (data['front']) {
    address += `, под.${data['front']}`;
  }
  if (data['floor']) {
    address += `, эт.${data['floor']}`;
  }
  if (data['flat']) {
    address += `, кв.${data['flat']}`;
  }

  const products = data['items'].map((item) => {
    return {
      uuid: item['uuid'],
      name: item['name'],
      brand: item['brand'],
      amount: item['saleAmount'] || item['amount'],
      currencyUuid: item['currency']['uuid'],
      gallery: item['gallery'],
    };
  });

  const order = {
    products: products,
    delivery: data['delivery'],
    pay: data['pay'],
    address: address,
    name: data['name'],
    surname: data['surname'],
    email: data['email'],
    description: data['description'],
    amount: data['amount']
  };

  const result = await request({
    url: process.env['OPERATION_API_SRV'] + '/operations',
    method: 'post',
    data: order,
  });

  ctx.body = {
    success: true,
    data: {
      externalId: result['data'],
    },
  };
}
