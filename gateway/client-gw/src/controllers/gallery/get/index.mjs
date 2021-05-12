
import request from 'axios';


export default () => async (ctx) => {
  const { fileName } = ctx['params'];
  const { size = 'large' } = ctx['query'];

  const { data } = await request({
    method: 'get',
    url: process.env['GALLERY_API_SRV'] + `/images/${fileName}`,
    responseType: 'stream',
    params: {
      size
    }
  });

  ctx.body = data;
}
