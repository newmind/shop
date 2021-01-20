
import request from "@sys.packages/request";


export default () => async (ctx) => {
  const {externalId} = ctx['params'];

  const result = await request({
    url: process.env['OPERATION_API_SRV'] + '/operations',
    method: 'get',
    params: {
      externalId,
    },
  });

  const operation = result['data'][0];

  if (!operation) {
    ctx.status = 404;
    ctx.body = {};
  }

  ctx.body = {
    success: true,
    data: operation,
  };
}
