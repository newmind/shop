'use strict';

import { deleteById } from '../../requests/Stock/index';


export default () => async (ctx) => {

  const { productId } = ctx['params'];

  const { data } = await deleteById(productId,);

  ctx.body = data;
}
