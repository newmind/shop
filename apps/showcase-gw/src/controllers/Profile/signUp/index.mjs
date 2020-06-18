
import request from '@sys.packages/request';


export default () => async (ctx) => {
  try {
    const formData = ctx.request['body'];

    const { data } = await request({
      url: process.env['IDENTITY_API_SRV'] + '/sign-up',
      method: 'post',
      data: formData,
    });

    ctx.cookies.set(process.env['COOKIE_NAME'], encodeURIComponent(JSON.stringify(data)), {
      httpOnly: true,
    });

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
