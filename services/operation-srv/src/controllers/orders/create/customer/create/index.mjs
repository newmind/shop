
import request from '@sys.packages/request';


export default async function(data) {
  const result = await request({
    url: process.env['CUSTOMER_API_SRV'] + '/customers',
    method: 'post',
    data: {
      name: data['name'],
      patronymic: data['patronymic'] || null,
      surname: data['surname'],
      email: data['email'],
      phone: data['phone'],
      address: data['address'],
    },
  });

  return result['data'];
}
