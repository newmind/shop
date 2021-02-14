
import request from '@sys.packages/request';


export default () => async (ctx) => {
  const { uuid } = ctx['request']['body'];

  const result = await request({
    url: process.env['OPERATION_API_SRV'] + '/amounts',
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
