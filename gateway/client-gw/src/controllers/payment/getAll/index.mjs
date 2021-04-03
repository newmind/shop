
import request from '@sys.packages/request';


export default () => async (ctx) => {

  const result = await request({
    url: process.env['OPERATION_API_SRV'] + '/operations/payments',
    method: 'get',
    params: {
      isUse: true,
    },
  });

  ctx.body = {
    success: true,
    data: result['data'],
  };
}
