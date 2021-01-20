
import request from "@sys.packages/request";
import { getFiles } from "@sys.packages/sys.utils";


export default () => async (ctx) => {
  const { files = {}, fields = {}} = await getFiles(ctx['req']);

  if ('file' in files) {
    const fileBuffer = files['file']['buffer'];

    const { data } = await request({
      url: process.env['GALLERY_API_SRV'] + '/images',
      method: 'post',
      headers: {
        'Content-type': 'application/octet-stream',
      },
      data: fileBuffer,
    });

    fields['imageId'] = data['externalId'];
  }

  const { data } = await request({
    url: process.env['PRODUCT_API_SRV'] + '/categories',
    method: 'post',
    data: fields,
  });

  ctx.body = {
    success: true,
    data: data,
  };
};
