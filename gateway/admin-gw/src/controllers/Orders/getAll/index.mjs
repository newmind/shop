
import request from "@sys.packages/request";


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

      console.log(order)

      const { data } = await request({
        url: process.env['CUSTOMER_API_SRV'] + '/customers',
        method: 'get',
        params: {
          id: order['customerId'],
        }
      });

      orders.push({
        ...order,
        customer: data[0],
      });
    }
  }

  ctx.body = {
    success: true,
    data: orders,
    meta: result['meta'],
  };
}
