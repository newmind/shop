'use strict';

import { deleteById } from '../../requests/Product/index';


export default () => async (ctx) => {

  const { productId } = ctx['params'];

  const { data } = await deleteById(productId,);

  ctx.body = data;
}
