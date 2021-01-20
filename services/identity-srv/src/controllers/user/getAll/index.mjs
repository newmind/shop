
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
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
};
