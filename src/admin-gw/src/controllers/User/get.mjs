'use strict';

// import { signIn } from "../../requests/User";


export default () => async (ctx) => {
  try {

    ctx.body = {
      role: 'admin',
      permissions: ['product.get'],
      name: 'Виктор',
      surname: 'Пятаков',
      phone: '+79154537766',
      email: 'zenlya911@mail.ru',
    };

  } catch(error) {

    const { status, data } = error['response'];

    ctx.throw(status, data);
  }
}
