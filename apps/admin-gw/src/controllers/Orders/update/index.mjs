
import request from "@sys.packages/request";


export default () => async (ctx) => {
  try {
    const { externalId } = ctx['params'];
    const fields = ctx['request']['body'];

    const result = await request({
      url: process.env['OPERATION_API_SRV'] + '/operations/' + externalId,
      method: 'put',
      data: {
        statusCode: fields['statusCode'],
        pay: fields['pay'],
        name: fields['name'],
        phone: fields['phone'],
        email: fields['email'],
        surname: fields['surname'],
        address: fields['address'],
        delivery: fields['delivery'],
        amount: fields['amount'],
      },
    });

    ctx.body = {
      success: true,
      data: result['data'],
    };
  }
  catch(error) {

    ctx.status = 500;
    ctx.body = {
      success: false,
      error: {
        code: '500',
        message: error['message'],
      },
    };
  }
}