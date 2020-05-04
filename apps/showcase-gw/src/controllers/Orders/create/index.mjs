
import request from "@sys.packages/request";


export default () => async (ctx) => {
  try {
    const data = ctx['request']['body'];

    const items = data['items'].map((item) => {
      return {
        type: item['productType'],
        lens: item['lens'],
        productId: item['uuid'],
        recipe: item['recipe'],
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
  catch(error) {

    ctx.status = 500;
    ctx.body = { code: '500', message: error['message'] };
  }
};

