'use strict';

// import { signIn } from "../../requests/User";


export default () => async (ctx) => {
  try {

    const { body } = ctx.request;

    console.log(body);

    ctx.body = {};

  } catch(error) {

    const { status, data } = error['response'];

    ctx.throw(status, data);
  }
}
