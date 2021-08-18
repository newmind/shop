
import { NotfoundError } from '@packages/errors';

import request from '@sys.packages/request';

import productBuild from '../_utils/productBuilder.mjs';


async function getShops() {
  const { data } = await request({
    method: 'get',
    url: process.env['SHOP_API_SRV'] + '/shops',
  });

  return data;
}

async function getProductByUUID(uuid) {
  const { data } = await request({
    method: 'get',
    url: process.env['PRODUCT_API_SRV'] + '/products',
    params: {
      uuid,
      isView: true,
    }
  });

  if ( ! data.length) {
    throw new NotfoundError('Запрашиваемый продукт не найден');
  }

  return data[0];
}


export default () => async (ctx) => {
  const { uuid } = ctx['params'];

  const product = await getProductByUUID(uuid);
  const shops = await getShops();

  const resultProduct = {
    ...product,
    shops: product['shops'].map((shop) => {
      const shopObject = shops.find((item) => item['uuid'] === shop['shopUuid']);
      if (shopObject) {
        return {
          uuid: shopObject['uuid'],
          name: shopObject['name'],
          address: shopObject['address'],
          number: shop['number'],
        }
      }
      return {
        uuid: shopObject['uuid'],
        name: 'Нет информации',
        address: 'Нет информации',
        number: shop['number'],
      }
    }),
  };

  ctx.body = {
    success: true,
    data: productBuild(resultProduct),
  };
};
