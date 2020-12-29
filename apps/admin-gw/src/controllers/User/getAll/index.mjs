
import axios from "@sys.packages/request";


export default () => async (ctx) => {
  const result = await axios({
    method: 'get',
    url: process.env['INVOICE_API_SRV'] + `/passport`,
  });

  ctx.body = {
    success: true,
    data: result['data'],
  };
}
