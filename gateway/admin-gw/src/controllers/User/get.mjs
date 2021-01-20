
import { get } from "./requests/index.mjs";


export default () => async (ctx) => {
  const {id} = ctx.user || {};

  if (!id) {
    ctx.status = 401;
    return ctx.body = {
      success: false,
      error: {
        code: 401,
        message: 'Unauthorized'
      },
    };
  }

  const {data} = await get(id);

  delete data['userId'];

  ctx.body = {
    success: true,
    data: data,
  };
}
