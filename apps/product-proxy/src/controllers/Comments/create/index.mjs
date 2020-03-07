
import { models } from '@sys.packages/db';
import { sendEvent } from "@sys.packages/rabbit";


export default () => async (ctx) => {
  try {
    const { Comment } = models;
    const { id } = ctx['params'];
    const { ...formData } = ctx['request']['body'];

    const result = await Comment.create({
      productId: id,
      ...formData,
    }, {
      attributes: ['id', 'evaluation', 'person', 'comment', 'createdAt'],
    });

    sendEvent(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_COMMENT_CREATED'], JSON.stringify(result.toJSON()));

    ctx.body = {
      success: true,
      data: result.toJSON(),
    };
  }
  catch(e) {

    ctx.status = 500;
    ctx.body = {
      success: false,
      error: { code: '500', message: e['message'] },
    };
  }
};
