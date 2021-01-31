
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Type, Category } = models;

  const result = await Type.findAll({
    attributes: ['id', 'value', 'description'],
    include: [
      {
        model: Category,
        as: 'categories',
        attributes: ['id', 'value', 'description'],
        through: { attributes: [] },
      }
    ]
  });

  ctx.body = {
    success: true,
    data: result.map((item) => item.toJSON()),
  };
};
