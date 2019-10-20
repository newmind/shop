'use strict';

import request from "@sys.packages/request";

const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];


export default () => async (ctx) => {

  const result = await request({
    url: `${PRODUCT_API_SRV}/operations`,
    method: 'get',
  });

  ctx.body = result['data'];
}
