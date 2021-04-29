
import request from '@sys.packages/request';


export default async (data) => {

  const result = await request({
    url: process.env['PIKASSA_API_SRV'] + '/operation',
    method: 'post',
    data: {
      externalId: data['externalId'],
      amount: data['amount'],
      currency: data['currency'],
      description: data['description'],
      phone: data['phone'],
      email: data['email'],
      name: data['name'],
      surname: data['surname'],
      address: data['address'],
    }
  });

  return result['data'];
}