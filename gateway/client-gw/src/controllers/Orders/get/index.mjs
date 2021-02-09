
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

function getCustomerAddress(data) {
  let address = '';
  if (data['postalCode']) {
    address += data['postalCode'];
  }
  if (data['country']) {
    address += ', ' + data['country'];
  }
  if (data['province']) {
    address += ', ' + data['province'];
  }
  if (data['locality']) {
    address += ', ' + data['locality'];
  }
  if (data['street']) {
    address += ', ' + data['street'];
  }
  if (data['house']) {
    address += ', д.' + data['house'];
  }
  if (data['entrance']) {
    address += ', пд.' + data['entrance'];
  }
  if (data['floor']) {
    address += ', эт.' + data['floor'];
  }
  if (data['flat']) {
    address += ', кв.' + data['flat'];
  }
  return address.trim();
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
      id: order['orderId'],
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
      brands: item['brands'].map((item) => item['value']),
      gallery: item['gallery'].map((item) => item['uuid']),
      price: product['price'],
      currency: product['currency']['value'],
      count: product['count'],
    }
  });

  ctx.body = {
    success: true,
    data: {
      customer: {
        name: getCustomerName(customer),
        address: getCustomerAddress(customer['address']),
      },
      products: productsMapper,
      externalId: order['externalId'],
      currency: order['currency']['value'],
      delivery: order['delivery']['name'],
      payment: order['payment']['name'],
      price: order['price'],
      status: order['status'],
      createdAt: order['createdAt'],
      updatedAt: order['updatedAt'],
    },
  };
}
