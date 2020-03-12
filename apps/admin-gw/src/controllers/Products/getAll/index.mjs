
import request from '@sys.packages/request';


const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];


export default () => async (ctx) => {
  try {
    const { ...params } = ctx['request']['query'];

    const { data: types } = await request({
      url: `${PRODUCT_API_SRV}/products/types`,
      method: 'get',
      params,
    });
    const { data: forms } = await request({
      url: `${PRODUCT_API_SRV}/products/forms`,
      method: 'get',
      params,
    });
    const { data: colors } = await request({
      url: `${PRODUCT_API_SRV}/products/colors`,
      method: 'get',
      params,
    });
    const { data: brands } = await request({
      url: `${PRODUCT_API_SRV}/products/brands`,
      method: 'get',
      params,
    });
    const { data: materials } = await request({
      url: `${PRODUCT_API_SRV}/products/materials`,
      method: 'get',
      params,
    });
    const { data: categories } = await request({
      url: `${PRODUCT_API_SRV}/products/categories`,
      method: 'get',
      params,
    });


    const { data, meta } = await request({
      method: 'get',
      url: PRODUCT_API_SRV + '/products',
      params,
    });

    ctx.body = {
      success: true,
      data: data,
      filter: {
        types: types,
        forms: forms,
        colors: colors,
        brands: brands,
        materials: materials,
        categories: categories,
      },
      meta: {
        total: meta['total'],
      },
    };
  }
  catch(error) {

    ctx.status = 500;
    ctx.body = {
      success: false,
      error: {
        code: '500',
        message: error['message']
      }
    };
  }
}
