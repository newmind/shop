
export default () => async (ctx) => {
  try {

    ctx.cookies.set(process.env['COOKIE_NAME'], null);

    ctx.body = {
      success: true,
      data: null,
    };
  }
  catch(error) {

    ctx.status = error['status'];
    ctx.body = {
      success: false,
      error: error['data']['error'],
    };
  }
};
