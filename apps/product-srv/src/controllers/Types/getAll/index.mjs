
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Type } = models;

  const result = await Type.findAll({
    attributes: ['id', 'value', 'description', 'imageId'],
    order: [['createdAt', 'desc']],
    include: [],
  });

  ctx.body = {
    success: true,
    data: [ ...result ]
  };
};
