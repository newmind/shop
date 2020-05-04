
// import { sequelize, models } from '@sys.packages/db';
// import { sendEvent } from '@sys.packages/rabbit';


export default () => async (ctx) => {

  // const { productId } = ctx.params;
  // const { body } = ctx.request;

  ctx.body = {
    success: true,
    data: null,
  };
};
