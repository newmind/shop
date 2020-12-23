
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Units } = models;

  const result = await Units.findAll({
    attributes: ['id', 'value', 'description'],
    order: [['createdAt', 'desc']],
  });

  ctx.body = {
    success: true,
    data: result,
  };
};
