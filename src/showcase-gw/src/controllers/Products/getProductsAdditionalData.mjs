'use strict';

import request from 'axios';


const API_BRANDS_SERVER = process.env['API_BRANDS_SERVER'];
const API_CATEGORY_SERVER = process.env['API_CATEGORY_SERVER'];

export default () => async (ctx) => {

  const { data: brands } = await request(API_BRANDS_SERVER);
  const { data: categories } = await request(API_CATEGORY_SERVER);

  ctx.body = {
    categories: [...categories['data']],
    brands: [...brands['data']],
    names: [],
  };
}
