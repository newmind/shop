
import request from '@sys.packages/request';

import productBuild from './builders/product';


export default async function(uuids) {
  const result = await request({
    url: process.env['PRODUCT_API_SRV'] + '/products',
    method: 'get',
    params: {
      uuid: uuids,
    },
  });

  return result['data'].map(product => productBuild(product));
}
