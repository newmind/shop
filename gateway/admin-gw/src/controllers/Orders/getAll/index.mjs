
import { NetworkError } from '@packages/errors';

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
  const params = ctx['params'];

  const result = await request({
    url: process.env['OPERATION_API_SRV'] + '/operations',
    method: 'get',
    params,
  });

  const orders = [];
  for (let index in result['data']) {
    if (result['data'].hasOwnProperty(index)) {
      const order = result['data'][index];

      const { data } = await request({
        url: process.env['CUSTOMER_API_SRV'] + '/customers',
        method: 'get',
        params: {
          id: order['customerId'],
        }
      });

      if ( ! data[0]) {
        throw new NetworkError({ code: '404', message: 'Клиент не найден' });
      }

      orders.push({
        createdAt: order['createdAt'],
        currency: order['currency']['value'],
        delivery: order['delivery']['name'],
        externalId: order['externalId'],
        payment: order['payment']['name'],
        price: order['price'],
        products: order['products'].map((product) => ({
          uuid: product['uuid'],
          fiscal: product['fiscal'],
          price: product['price'],
          currency: product['currency']['value'],
          count: product['count'],
        })),
        status: order['status']['name'],
        updatedAt: order['updatedAt'],
        customer: {
          name: getCustomerName(data[0]),
          address: getCustomerAddress(data[0]['address']),
        },
      });
    }
  }

  ctx.body = {
    success: true,
    data: orders,
    meta: result['meta'],
  };
}
