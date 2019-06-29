'use strict';

import { get } from '../../requests/Product';


export default () => async (ctx) => {

  let filter = {};
  const { status } = ctx.request.query;

  if (status) {
    filter['status'] = status;
  }
  const { data } = await get(filter);

  ctx.body = {
    items: data['products'],
    paging: {
      page: 0,
      pages: data['counts'],
    },
  };
}
