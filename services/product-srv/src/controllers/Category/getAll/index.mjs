
import { models } from '@sys.packages/db';


export default () => async (ctx) => {

  const categories = await models['Category'].findAll({
    attributes: ['id', 'value', 'description', 'imageId', 'createdAt', 'updatedAt'],
    order: [['createdAt', 'desc']],
  });

  ctx.body = {
    success: true,
    data: [ ...categories ],
  };
};
