
import request from 'axios';


export default () => async (ctx) => {
  const { id } = ctx['params'];

  const result = await request({
    method: 'get',
    url: process.env['GALLERY_API_SRV'] + '/images/' + id,
    responseType: 'stream',
  });

  ctx.body = {
    success: true,
    data: result['data'],
  };
}
