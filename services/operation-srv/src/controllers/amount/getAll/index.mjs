
import request from "@sys.packages/request";


export default () => async (ctx) => {
  const amounts = [];
  const { uuid } = ctx['request']['body'];

  const { data: products } = await request({
    url: process.env['PRODUCT_API_SRV'] + '/products',
    method: 'get',
    params: {
      uuid: uuid.map(item => item[0]),
    },
  });

  for (let index in products) {
    if (products.hasOwnProperty(index)) {
      const product = products[index];
      const amountIndex = amounts.findIndex((item) => item[0] === product['currency']['code']);
      const count = uuid.find(item => item[0] === product['uuid'])[1];

      if (amountIndex > -1) {
        amounts[amountIndex][1] += product['price'] * count;
      }
      else {
        amounts.push([product['currency']['code'], product['price'] * count, product['currency']['value']]);
      }
    }
  }

  ctx.body = {
    success: true,
    data: amounts,
  };
};
