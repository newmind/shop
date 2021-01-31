
import request from '@sys.packages/request';


const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];


export default () => async (ctx) => {
  const { uuid } = ctx['request']['body'];

  const result = await request({
    method: 'delete',
    url: PRODUCT_API_SRV + '/promotions',
    data: { uuid },
  });

  ctx.body = {
    success: true,
    data: result['data'],
  };
}
