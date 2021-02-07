
import request from '@sys.packages/request';


export default () => async (ctx) => {
  const { uuid } = ctx['request']['body'];

  const result = await request({
    url: process.env['PRODUCT_API_SRV'] + '/products/amount',
    method: 'post',
    data: {
      uuid,
    }
  });

  ctx.body = {
    success: true,
    data: result['data'],
  };
};
