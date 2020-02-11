
import request from "@sys.packages/request";


export default () => async (ctx) => {
  try {

    const { data } = await request({
      url: process.env['PRODUCT_API_SRV'] + '/materials',
      method: 'get',
    });

    ctx.body = {
      success: true,
      data: [ ...data ],
    };
  }
  catch(e) {

    ctx.status = 500;
    ctx.body = {
      success: false,
      error: {
        code: '500',
        message: e.message,
      }
    };
  }
};
