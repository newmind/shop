
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  try {
    const { Type } = models;

    const result = await Type.findAll({
      attributes: ['id', 'value', 'description'],
      order: [['createdAt', 'desc']],
    });

    ctx.body = {
      success: true,
      data: [ ...result ],
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
