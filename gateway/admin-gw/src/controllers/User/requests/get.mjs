
import { NotfoundError } from '@packages/errors';

import axios from '@sys.packages/request';


export default async (id) => {

  const user = await axios({
    method: 'get',
    url: process.env['IDENTITY_API_SRV'] + `/passport/${id}`,
  });

  if ( ! user) {
    throw new NotfoundError({ code: '401', message: 'User не найден' });
  }

  return user;
};
