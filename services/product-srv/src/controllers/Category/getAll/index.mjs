
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Category } = models;
  const { all = false } = ctx['query'];

  let categories;

  if (all) {
    categories = await Category.findAll({
      attributes: ['id', 'value', 'description'],
      order: [['id', 'desc']],
    });
  }
  else {
    categories = await Category.findAll({
      attributes: ['id', 'value', 'description', 'parentId'],
      order: [['id', 'desc']],
      where: { parentId: null },
      include: [
        {
          model: Category,
          attributes: ['id', 'value', 'description', 'parentId'],
          as: 'sub-categories',
        }
      ],
    });
  }

  ctx.body = {
    success: true,
    data: [ ...categories ],
  };
};
