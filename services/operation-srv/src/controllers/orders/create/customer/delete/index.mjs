
import request from '@sys.packages/request';


export default async function(id) {
  await request({
    url: process.env['CUSTOMER_API_SRV'] + '/customers',
    method: 'delete',
    data: {
      id,
    },
  });
}
