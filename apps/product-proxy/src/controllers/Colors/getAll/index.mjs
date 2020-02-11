
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  try {
    const { Color } = models;

    const result = await Color.findAll({
      attributes: ['id', 'value', 'description'],
    });

    ctx.body = {
      success: true,
      data: [ ...result ],
    };
  }
  catch(e) {

    ctx.status = 500;
    ctx.body = {
      success: false,
      error: {
        code: '500',
        message: e.message,
      }
    };
  }
};
