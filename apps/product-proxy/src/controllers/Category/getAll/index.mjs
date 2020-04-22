
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  try {

    const categories = await models['Category'].findAll({
      attributes: ['id', 'value', 'description'],
      order: [['id', 'ASC']],
    });

    ctx.body = {
      success: true,
      data: [ ...categories ],
    };
  }
  catch(error) {

    ctx.status = 500;
    ctx.body = {
      success: false,
      error: {
        code: '500',
        message: error['message']
      }
    };
  }
};
