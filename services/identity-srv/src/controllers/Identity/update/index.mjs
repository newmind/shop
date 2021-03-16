
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { User } = models;
  const data = ctx['request']['body'];
  const { id } = ctx['params'];

  await User.update({
    login: data['login'],
  }, {
    where: {
      id,
    }
  });

  ctx.body = {
    success: true,
    data: null,
  };
}
