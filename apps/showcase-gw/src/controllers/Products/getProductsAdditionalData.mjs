'use strict';

import request from 'axios';

const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];


export default () => async (ctx) => {

  const { data: brands } = await request(`${PRODUCT_API_SRV}/brands`);
  const { data: categories } = await request(`${PRODUCT_API_SRV}/category`);

  ctx.body = {
    categories: [...categories['data']],
    brands: [...brands['data']],
    names: [],
  };
}
