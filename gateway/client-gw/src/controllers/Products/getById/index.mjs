
import { NotfoundError } from '@packages/errors';

import request from '@sys.packages/request';

import productBuild from '../_utils/productBuilder.mjs';


async function getProductByUUID(uuid) {
  const { data } = await request({
    method: 'get',
    url: process.env['PRODUCT_API_SRV'] + '/products',
    params: {
      uuid,
      status: 1,
    }
  });

  if ( ! data.length) {
    throw new NotfoundError('Запрашиваемый продукт не найден')
  }

  return data[0];
}


export default () => async (ctx) => {
  const { uuid } = ctx['params'];

  const product = await getProductByUUID(uuid);

  ctx.body = {
    success: true,
    data: productBuild(product),
  };
};
