
import request from '@sys.packages/request';
import { getFiles } from '@sys.packages/utils';


export default () => async (ctx) => {
  const {files = {}, fields = {}} = await getFiles(ctx['req']);

  const {data} = await request({
    url: process.env['IDENTITY_API_SRV'] + '/sign-up',
    method: 'post',
    data: fields,
  });

  if (files['avatar']) {
    const fileBuffer = files['avatar']['buffer'];

    await request({
      url: process.env['GALLERY_API_SRV'] + '/images',
      method: 'post',
      headers: {
        'Content-type': 'application/octet-stream',
      },
      data: fileBuffer,
    });
  }

  ctx.cookies.set(process.env['COOKIE_NAME'], encodeURIComponent(JSON.stringify(data)), {
    httpOnly: true,
  });

  ctx.body = {
    success: true,
    data: null,
  };
}
