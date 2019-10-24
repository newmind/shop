'use strict';

import { deleteById } from './requests';


export default () => async (ctx) => {

  const { productId } = ctx['params'];

  const { data } = await deleteById(productId,);

  ctx.body = data;
}
