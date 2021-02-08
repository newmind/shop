
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Unit } = models;

  const result = await Unit.findAll({
    attributes: ['id', 'value', 'description'],
    order: [['id', 'desc']],
  });

  ctx.body = {
    success: true,
    data: result,
  };
};
