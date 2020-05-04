
import request from "@sys.packages/request";


export default () => async (ctx) => {
  try {

    const result = await request({
      url: process.env['OPERATION_API_SRV'] + '/operations',
      method: 'get',
      params: {},
    });

    ctx.body = {
      success: true,
      data: result['data'],
    };
  }
  catch(e) {

    ctx.status = 500;
    ctx.body = {
      success: false,
      error: {
        code: '500',
        message: e['message'],
      },
    };
  }
}
