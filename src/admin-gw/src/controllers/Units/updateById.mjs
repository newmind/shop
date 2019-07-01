'use strict';

import { updateById } from '../../requests/Unit';


export default () => async (ctx) => {

  const { unitId } = ctx.params;
  const { body } = ctx.request;

  const { data } = await updateById(unitId, body);

  ctx.body = data;
}
