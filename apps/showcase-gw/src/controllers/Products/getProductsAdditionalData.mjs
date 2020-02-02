'use strict';

import request from 'axios';

const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];


export default () => async (ctx) => {
  try {

    const { data: forms } = await request(`${PRODUCT_API_SRV}/forms`);
    const { data: colors } = await request(`${PRODUCT_API_SRV}/colors`);
    const { data: brands } = await request(`${PRODUCT_API_SRV}/brands`);
    const { data: categories } = await request(`${PRODUCT_API_SRV}/category`);

    ctx.body = {
      success: true,
      data: {
        forms: [...forms['data']],
        colors: [...colors['data']],
        brands: [...brands['data']],
        categories: [...categories['data']],
      },
    };
  }
  catch(error) {

    ctx.status = 500;
    ctx.body = { success: false, error: { code: '500', message: error['message'] }};
  }
}
