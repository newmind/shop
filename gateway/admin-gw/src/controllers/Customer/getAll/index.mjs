
import request from "@sys.packages/request";


export default () => async (ctx) => {
  const { data, meta } = await request({
    url: process.env['CUSTOMER_API_SRV'] + '/customers',
    method: 'get',
  });

  ctx.body = {
    success: true,
    data,
    meta,
  };
};
