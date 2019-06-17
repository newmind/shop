'use strict';

import request from 'axios';

const API_GALLERY_SERVER = process.env['API_GALLERY_SERVER'];


export default () => async (ctx) => {

  const { fileName } = ctx['params'];
  const { data } = await request({
    method: 'get',
    url: `${API_GALLERY_SERVER}/${fileName}`,
    responseType: 'stream',
  });

  ctx.body = data;
}
