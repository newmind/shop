
import { update } from "./requests";


export default () => async (ctx) => {
  const {id} = ctx['user'];
  const {body} = ctx['request'];

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

  const {data} = await update(id, body);

  ctx.body = {
    success: true,
    data: data,
  };
}
