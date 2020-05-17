
import request from "@sys.packages/request";

import statusBuilder from './builders/status';


export default () => async (ctx) => {
  try {

    const { data } = await request({
      url: process.env['OPERATION_API_SRV'] + '/statuses',
      method: 'get',
    });

    ctx.body = {
      success: true,
      data: data.map((item) => statusBuilder(item)),
    };
  }
  catch(error) {

    ctx.status = 500;
    ctx.body = {
      success: false,
      error: {
        code: '500',
        message: error['message'],
      }
    };
  }
};
