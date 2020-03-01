
import request from "@sys.packages/request";

const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];


export default () => async (ctx) => {
  try {
    const formData = ctx['request']['body'];

    const result = await request({
      url: `${PRODUCT_API_SRV}/operations`,
      method: 'put',
      data: formData,
    });

    ctx.body = { success: true, data: result['data'] };
  }
  catch(e) {

    ctx.status = 500;
    ctx.body = { success: false, error: { code: '500', message: e['message'] }};
  }
}