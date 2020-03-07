
import { models } from '@sys.packages/db';

import { sendEvent } from "@sys.packages/rabbit";


export default () => async (ctx) => {
  try {
    const { Comment } = models;
    const { id } = ctx['request']['body'];

    await Comment.destroy({
      where: { id }
    });

    sendEvent(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_COMMENT_DELETED'], JSON.stringify(id));

    ctx.body = {
      success: true,
      data: id,
    };
  }
  catch(e) {

    ctx.status = 500;
    ctx.body = {
      code: '500',
      message: e['message']
    };
  }
};
