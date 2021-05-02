
import request from '@sys.packages/request';


export default async function(uuid) {
  const result = await request({
    url: process.env['GALLERY_API_SRV'] + '/images/' + uuid,
    method: 'get',
    responseType: 'arraybuffer',
    params: {
      size: 'small',
    },
  });

  return 'data:image/jpg;base64,' + Buffer.from(result, 'binary').toString('base64');
}
