
import { NotfoundError } from '@packages/errors';

import request from "@sys.packages/request";


function getCustomerName(data) {
  let name = '';
  if (data['surname']) {
    name += ' ' + data['surname'];
  }
  if (data['name']) {
    name += ' ' + data['name'];
  }
  if (data['patronymic']) {
    name += ' ' + data['patronymic'];
  }
  return name.trim();
}

export default () => async (ctx) => {
  const { externalId } = ctx['params'];

  const { data: orders } = await request({
    url: process.env['OPERATION_API_SRV'] + '/operations',
    method: 'get',
    params: {
      externalId,
    },
  });

  const order = orders[0];

  if ( ! order) {
    throw new NotfoundError({ code: '404', message: 'Заказ не найден' });
  }

  const { data: customers } = await request({
    url: process.env['CUSTOMER_API_SRV'] + '/customers',
    method: 'get',
    params: {
      id: order['customerId'],
    }
  });

  const customer = customers[0];

  if ( ! customer) {
    throw new NotfoundError({ code: '404', message: 'Клиент не найден' });
  }

  const { data: products } = await request({
    url: process.env['PRODUCT_API_SRV'] + '/products',
    method: 'get',
    params: {
      uuid: order['products'].map((product) => product['uuid']),
    },
  });

  const productsMapper = order['products'].map((product) => {
    const item = products.find((item) => item['uuid'] === product['uuid']);
    return {
      uuid: item['uuid'],
      name: item['name'],
      brand: item['brands'].map((item) => item['value'])[0],
      gallery: item['gallery'].map((item) => item['uuid']),
      price: product['price'],
      currency: product['currency']['value'],
      count: product['count'],
      optionName: product['optionName'],
      optionVendor: product['optionVendor'],
    }
  });

  ctx.body = {
    success: true,
    data: {
      customer: {
        name: getCustomerName(customer),
        address: customer['meta']['address'],
      },
      products: productsMapper,
      externalId: order['externalId'],
      currency: order['currency']['value'],
      delivery: order['delivery']['name'],
      payment: order['payment']['name'],
      price: order['price'],
      status: order['status'],
      onlinePayment: order['onlinePayment'],
      createdAt: order['createdAt'],
      updatedAt: order['updatedAt'],
    },
  };
}
