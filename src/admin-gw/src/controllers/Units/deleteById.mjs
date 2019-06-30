'use strict';

import { deleteById } from '../../requests/Unit';


export default () => async (ctx) => {

  const { currencyId } = ctx['params'];

  const { data } = await deleteById(currencyId);

  ctx.body = data;
}
