
import request from '@sys.packages/request';


export default () => async (ctx) => {
  try {
    const { uuid } = ctx['request']['body'];

    const result = await request({
      url: process.env['GALLERY_API_SRV'] + '/images',
      method: 'delete',
      data: { externalId: uuid },
    });

    ctx.body = {
      success: true,
      data: result['data'],
    };
  }
  catch(e) {

    ctx.status = 500;
    ctx.body = {
      success: false,
      error: {
        code: '500',
        message: e['message'],
      },
    };
  }
}
