
import { NotfoundError, UnauthorizedError } from "@packages/errors";

import axios from "@sys.packages/request";


export default () => async (ctx) => {
  const { id } = ctx['user'] || {};

  if ( ! id) {
    throw new UnauthorizedError({ code: '401', message: 'id не найден' });
  }

  const { data: users } = await axios({
    method: 'get',
    url: process.env['IDENTITY_API_SRV'] + '/users',
    params: {
      id,
    },
  });

  if ( ! users.length) {
    throw new NotfoundError({ code: '401', message: 'user не найден' });
  }

  const { data: customers } = await axios({
    url: process.env['CUSTOMER_API_SRV'] + '/customers',
    method: 'get',
    params: {
      id: users[0]['customerId'],
    }
  });

  ctx.body = {
    success: true,
    data: {
      id: users[0]['id'],
      role: users[0]['role'],
      login: users[0]['login'],
      user: customers[0],
    },
  };
}
