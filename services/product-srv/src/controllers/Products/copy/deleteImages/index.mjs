
import request from "@sys.packages/request";


export default async function saveImages(ids) {
  await request({
    url: process.env['GALLERY_API_SRV'] + '/images',
    method: 'delete',
    data: ids,
  });
};
