'use strict';

import { deleteById } from '../../requests/Product';


export default () => async (ctx) => {

  const { ...formData } = ctx['request']['body'];
  const { productId } = ctx['params'];

  const { data } = await deleteById(productId, formData);

  ctx.body = data;
}
