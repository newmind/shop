
import request from '@sys.packages/request';


export default () => async (ctx) => {

  const result = await request({
    url: process.env['OPERATION_API_SRV'] + '/deliveries',
    method: 'get',
    params: {
      isUse: true,
    }
  });

  console.log(result)

  ctx.body = {
    success: true,
    data: result['data'],
  };
}
