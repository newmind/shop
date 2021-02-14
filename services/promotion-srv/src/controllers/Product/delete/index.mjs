
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Promotion } = models;
  const { id } = ctx['request']['body'];

  await Promotion.destroy({
    where: { id },
  });

  ctx.body = {
    success: true,
    data: id,
  };
};
