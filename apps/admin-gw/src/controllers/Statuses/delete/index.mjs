
import request from "@sys.packages/request";


export default () => async (ctx) => {
  try {
    const formData = ctx['request']['body'];

    const result = await request({
      url: process.env['PRODUCT_API_SRV'] + '/types',
      method: 'delete',
      data: formData,
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
};
