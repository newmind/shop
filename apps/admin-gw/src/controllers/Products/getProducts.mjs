'use strict';

import { get } from '../../requests/Product';


export default () => async (ctx) => {
  try {
    let filter = {};
    const { status } = ctx.request.query;

    if (status) {
      filter['status'] = status;
    }
    const { data } = await get(filter);

    ctx.body = {
      success: true,
      data: data,
      paging: {
        page: 0,
        pages: data['counts'],
      },
    };
  }
  catch(error) {

    ctx.status = 500;
    ctx.body = { success: false, error: { code: '500', message: error['message'] }};
  }
}
