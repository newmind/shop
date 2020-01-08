
import request from "@sys.packages/request";


export default () => async (ctx) => {
  try {
    const data = ctx['request']['body'];

    const items = data['items'].map((item) => {
      return {
        stockId: item['id'],
        type: item['type'],
        recipe: item['recipe'],
        lens: item['lens'],
      };
    });

    const result = await request({
      url: process.env['PRODUCT_API_SRV'] + '/operations',
      method: 'post',
      data: {
        delivery: data['delivery'],
        pay: data['pay'],
        name: data['name'],
        surname: data['surname'],
        phone: data['phone'],
        email: data['email'],
        address: data['address'],
        status: 1,
        items: items,
      },
    });

    ctx.body = {
      externalId: result['data']['externalId'],
    };
  }
  catch(error) {

    ctx.status = 500;
    ctx.body = { code: '', message: '' };
  }
};

