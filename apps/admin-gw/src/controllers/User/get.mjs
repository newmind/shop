
import { get } from "./requests";


export default () => async (ctx) => {
  try {

    const { id } = ctx.user || {};

    if ( ! id) {
      ctx.status = 401;
      return ctx.body = {
        success: false,
        error: {
          code: 401,
          message: 'Unauthorized'
        },
      };
    }

    const { data } = await get(id);

    delete data['userId'];

    ctx.body = {
      success: true,
      data: data,
    };

  }
  catch(error) {

    ctx.status = 500;
    ctx.body = {
      success: false,
      error: {
        code: 500,
        message: error['message'],
      },
    };
  }
}
