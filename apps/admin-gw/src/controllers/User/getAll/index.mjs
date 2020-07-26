
import axios from "@sys.packages/request";


export default () => async (ctx) => {
  try {

    const result = await axios({
      method: 'get',
      url: process.env['INVOICE_API_SRV'] + `/passport`,
    });

    ctx.body = {
      success: true,
      data: result['data'],
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
