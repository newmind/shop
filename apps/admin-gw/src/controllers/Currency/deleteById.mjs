'use strict';

import { deleteById } from '../../requests/Currency/index';


export default () => async (ctx) => {

  const { currencyId } = ctx['params'];

  const { data } = await deleteById(currencyId);

  ctx.body = data;
}
