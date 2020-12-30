
import request from "@sys.packages/request";


export default () => async (ctx) => {
  const formData = ctx['request']['body'];

  const result = await request({
    method: 'post',
    url: process.env['IDENTITY_API_SRV'] + '/connect',
    data: formData,
  });

  if (!result['data']) {

    ctx.status = 404;
    return ctx.body = {
      success: false,
      error: {code: '404', message: 'Пользователь не найден'},
    };
  }

  ctx.cookies.set(process.env['COOKIE_NAME'], encodeURIComponent(JSON.stringify(result['data'])), {
    httpOnly: true,
  });

  ctx.status = 200;
  ctx.body = {
    success: true,
    data: null,
  };
}
