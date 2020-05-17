
import request from "@sys.packages/request";


const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];


export default () => async (ctx) => {
  try {
    const { uuid } = ctx['request']['body'];

    const result = await request({
      url: PRODUCT_API_SRV + '/products',
      method: 'delete',
      data: { uuid },
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
        message: e.message,
      },
    };
  }
}
