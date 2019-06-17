'use strict';

import { updateById } from '../../requests/Currency/index';


export default () => async (ctx) => {

  const { currencyId } = ctx.params;
  const { body } = ctx.request;

  const { data } = await updateById(currencyId, body);

  ctx.body = data;
}
