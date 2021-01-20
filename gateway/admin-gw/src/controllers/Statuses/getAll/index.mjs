
import request from "@sys.packages/request";

import statusBuilder from './builders/status.mjs';


export default () => async (ctx) => {
  const {data} = await request({
    url: process.env['OPERATION_API_SRV'] + '/statuses',
    method: 'get',
  });

  ctx.body = {
    success: true,
    data: data.map((item) => statusBuilder(item)),
  };
}
