'use strict';

import { deleteById } from '../../requests/Category/index';


export default () => async (ctx) => {

  try {

    const { categoryId } = ctx['params'];
    const { data } = await deleteById(categoryId);

    ctx.body = data;

  } catch (error) {

    ctx.throw(500, error['error']);
  }
}
