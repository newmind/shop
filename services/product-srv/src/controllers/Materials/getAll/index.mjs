
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Material } = models;

  const result = await Material.findAll({
    attributes: ['id', 'value', 'description'],
    order: [['createdAt', 'desc']],
  });

  ctx.body = {
    success: true,
    data: [ ...result ],
  };
};
