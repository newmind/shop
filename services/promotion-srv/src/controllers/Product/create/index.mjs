
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Promotion } = models;
  const formData = ctx['request']['body'];

  const { id } = await Promotion.create(formData);

  const result = await Promotion.findOne({
    where: { id },
  });

  ctx.body = {
    success: true,
    data: result.toJSON(),
  };
};
