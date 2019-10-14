'use strict';

import { deleteById } from '../../requests/Unit';


export default () => async (ctx) => {

  const { unitId } = ctx['params'];

  const { data } = await deleteById(unitId);

  ctx.body = data;
}
