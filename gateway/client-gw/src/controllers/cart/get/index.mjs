
import request from "@sys.packages/request";

import productBuilder from "./productBuilder.mjs";


export default () => async (ctx) => {
  const { uuid } = ctx['request']['body'];

  const { data: products } = await request({
    url: process.env['PRODUCT_API_SRV'] + '/products',
    method: 'get',
    params: {
      uuid: uuid.map(item => item[0]),
    }
  });

  const { data: amount } = await request({
    url: process.env['OPERATION_API_SRV'] + '/amounts',
    method: 'post',
    data: {
      uuid,
    }
  });

  await new Promise(res => setTimeout(res, 2000))

  ctx.body = {
    success: true,
    data: {
      products: products.map((item) => productBuilder(item)),
      amount,
    }
  };
};
