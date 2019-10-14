'use strict';

import { getAll } from '../../requests/SubProduct';


export default () => async (ctx) => {

  let filter = {};
  const { status } = ctx.request.query;

  if (status) {
    filter['status'] = status;
  }
  const { data } = await getAll(filter);

  ctx.body = {
    items: data['products'],
    paging: {
      page: 0,
      pages: data['counts'],
    },
  };
}
