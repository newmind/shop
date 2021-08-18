
import request from "@sys.packages/request";


export default () => async (ctx) => {

  const { data } = await request({
    url: process.env['SHOP_API_SRV'] + '/payments',
    method: 'get',
  });

  ctx.body = {
    success: true,
    data,
  };
}
