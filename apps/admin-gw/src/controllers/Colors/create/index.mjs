
import request from "@sys.packages/request";


export default () => async (ctx) => {
  try {
    const formData = ctx['request']['body'];

    const { data } = await request({
      url: process.env['PRODUCT_API_SRV'] + '/colors',
      method: 'post',
      data: formData,
    });

    ctx.body = {
      success: true,
      data: data,
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
