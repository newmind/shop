'use strict';

import { getById } from '../../requests/SubProduct';


export default () => async (ctx) => {

  const { productId } = ctx.params;

  const { data } = await getById(productId);

  ctx.body = {
    ...data,
  };
}