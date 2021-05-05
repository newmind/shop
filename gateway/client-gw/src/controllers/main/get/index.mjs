
import request from "@sys.packages/request";

import productBuilder from "./productBuilder.mjs";


export default () => async (ctx) => {
  const result = {
    types: [],
  };

  const { data: types } = await request({
    url: process.env['PRODUCT_API_SRV'] + '/types',
  });

  if ( !! types.length) {
    for (let index in types) {
      if (types.hasOwnProperty(index)) {
        const type = types[index];

        const { data: products } = await request({
          url: process.env['PRODUCT_API_SRV'] + '/products',
          params: {
            isView: true,
            typeId: type['id'],
            take: 5,
            skip: 0,
          }
        });

        if ( !! products.length) {
          result['types'].push({
            ...type,
            products: products.map((product) => productBuilder(product)),
          });
        }
      }
    }
  }

  ctx.body = {
    success: true,
    data: result,
  };
};
