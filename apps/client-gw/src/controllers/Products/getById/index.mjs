
import { NotfoundError } from '@packages/errors';

import request from '@sys.packages/request';

const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];


export default () => async (ctx) => {
  const { uuid } = ctx['params'];

  const { data } = await request({
    method: 'get',
    url: `${PRODUCT_API_SRV}/products`,
    params: {
      uuid,
      status: 1,
    }
  });

  if ( ! data[0]) {

    throw new NotfoundError('Запрашиваемый продукт не найден')
  }

  ctx.body = {
    success: true,
    data: data[0],
  };
};
