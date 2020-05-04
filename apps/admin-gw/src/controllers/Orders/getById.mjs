
import request from 'axios';


export default () => async (ctx) => {
  try {
    const { operationId } = ctx['params'];

    const { data } = await request({
      url: process.env['OPERATION_API_SRV'] + '/operations/' + operationId,
    });

    ctx.body = {
      success: true,
      data,
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
