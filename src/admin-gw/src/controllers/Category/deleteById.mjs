'use strict';

import { deleteById } from '../../requests/Category';


export default () => async (ctx) => {

  try {

    const { categoryId } = ctx['params'];
    const result = await deleteById(categoryId);

    ctx.body = result;

  } catch (error) {

    ctx.throw(500, error['error']);
  }
}
