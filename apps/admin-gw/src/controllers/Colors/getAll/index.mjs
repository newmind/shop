
import request from "@sys.packages/request";


export default () => async (ctx) => {
  const { data } = await request({
    url: process.env['PRODUCT_API_SRV'] + '/colors',
    method: 'get',
  });

  ctx.body = {
    success: true,
    data: [ ...data ],
  };
};
