
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Passport } = models;
  const { id } = ctx['params'];

  const passport = await Passport.findOne({
    where: { userId: id }
  });

  ctx.status = 200;
  ctx.body = {
    success: true,
    data: passport ? passport.toJSON() : null,
  };
};
