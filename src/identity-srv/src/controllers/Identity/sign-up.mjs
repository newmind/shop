'use strict';


export default () => async (ctx) => {

  try {

    ctx.body = {}; //await User.create(ctx.request.body);
  }
  catch (err) {

    ctx.status = 400;
    ctx.body = err;
  }
};
