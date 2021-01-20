
import request from "@sys.packages/request";


export default () => async (ctx) => {
  const data = ctx['request']['body'];

  const items = data['items'].map((item) => {
    return {
      type: item['type'],
      lens: item['lens'],
      productId: item['uuid'],
      recipe: item['recipe'],
      amount: item['amount'] - item['saleAmount'],
      currencyId: item['currency']['uuid'],
    };
  });

  const result = await request({
    url: process.env['OPERATION_API_SRV'] + '/operations',
    method: 'post',
    data: {
      status: 1,
      items: items,
      pay: data['pay'],
      name: data['name'],
      phone: data['phone'],
      email: data['email'],
      surname: data['surname'],
      address: data['address'],
      delivery: data['delivery'],
      amount: Number(data['amount']),
    },
  });

  ctx.body = {
    externalId: result['data']['externalId'],
  };
}
