'use strict';

import { updateById } from '../../requests/Category';


export default () => async (ctx) => {

  const { categoryId } = ctx.params;
  const { body } = ctx.request;

  const { data } = await updateById(categoryId, body);

  ctx.body = data;
}
