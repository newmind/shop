
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Type } = models;

  const result = await Type.findAll({
    attributes: ['id', 'value', 'description'],
    include: []
  });

  ctx.body = {
    success: true,
    data: result.map((item) => item.toJSON()),
  };
};
