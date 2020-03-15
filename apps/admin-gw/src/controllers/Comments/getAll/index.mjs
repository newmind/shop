
import request from '@sys.packages/request';


const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];


export default () => async (ctx) => {
  try {
    let filter = {};
    const { status = null, id = null } = ctx['request']['query'];

    if (status) {
      filter['status'] = status;
    }

    if (id) {
      filter['id'] = id;
    }

    const { data, meta } = await request({
      method: 'get',
      url: PRODUCT_API_SRV + '/comments',
      params: filter,
    });

    ctx.body = {
      success: true,
      data: data,
      meta: {
        total: meta['total'],
      },
    };
  }
  catch(error) {

    ctx.status = 500;
    ctx.body = {
      success: false,
      error: {
        code: '500',
        message: error['message']
      }
    };
  }
}
