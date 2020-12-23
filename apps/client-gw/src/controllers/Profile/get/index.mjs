
import request from '@sys.packages/request';


export default () => async (ctx) => {
  try {

    const user = ctx.user;

    let profile = null;

    if (user) {
      const { data } = await request({
        url: process.env['IDENTITY_API_SRV'] + '/passport/' + user['id'],
      });

      profile = data;
    }
    else {
      ctx.cookies.set(process.env['COOKIE_NAME'], null, {
        httpOnly: true,
      });
    }

    ctx.status = 200;
    ctx.body = {
      success: true,
      data: profile,
    };
  }
  catch(error) {

    ctx.status = 500;
    ctx.body = {
      success: false,
      error: { code: 500, message: '' },
    };
  }
};
