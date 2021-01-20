
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Color } = models;

  const result = await Color.findAll({
    attributes: ['id', 'value', 'description'],
    order: [['createdAt', 'desc']],
  });

  ctx.body = {
    success: true,
    data: [ ...result ],
  };
};
