'use strict';

import { get } from '../../requests/Stock/index';


export default () => async (ctx) => {

  const { data } = await get();

  ctx.body = {
    items: data['products'],
    paging: {
      page: 0,
      pages: data['counts'],
    },
  };
}
