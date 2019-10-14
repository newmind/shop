'use strict';

import { deleteById } from '../../requests/SubProduct';


export default () => async (ctx) => {

  const { productId } = ctx['params'];

  const { data } = await deleteById(productId,);

  ctx.body = data;
}
