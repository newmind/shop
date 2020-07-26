
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  try {

    const { User, Passport } = models;

    const passport = await User.findAll({
      include: [{
        model: Passport,
        as: 'user',
      }]
    });

    ctx.status = 200;
    ctx.body = {
      success: true,
      data: passport,
    };
  }
  catch(error) {

    ctx.status = 500;
    ctx.body = {
      success: false,
      error: {
        code: 500,
        message: error['message'],
      }
    };
  }
};
