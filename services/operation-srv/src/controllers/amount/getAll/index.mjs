
import request from "@sys.packages/request";
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const amounts = {};
  const { Currency } = models;
  const { uuid } = ctx['request']['body'];

  const result = await Currency.findAll({
    attributes: ['code', 'value'],
  });

  const currencies = result.map((currency) => currency.toJSON());

  for (let index in currencies) {
    if (currencies.hasOwnProperty(index)) {
      amounts[currencies[index]['code']] = {
        price: 0,
        value: currencies[index]['value'],
      };
    }
  }

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
      const count = uuid.find(item => item[0] === product['uuid'])[1];

      amounts[product['currency']['code']] = {
        ...amounts[product['currency']['code']],
        price: amounts[product['currency']['code']]['price'] + product['price'] * count,
      };
    }
  }

  ctx.body = {
    success: true,
    data: Object.keys(amounts).map((key) => [key, amounts[key]['price'], amounts[key]['value']]),
  };
};
