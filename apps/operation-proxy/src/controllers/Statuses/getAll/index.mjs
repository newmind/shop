
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  try {
    const where = {};

    const { Status } = models;
    const { id } = ctx['request']['query'];

    if (id) {
      where['id'] = id;
    }

    const statuses = await Status.findAndCountAll({
      where: { ...where },
      distinct: true,
      order: [['createdAt', 'desc']],
      attributes: ['id', 'name', 'code', 'description', 'createdAt', 'updatedAt'],
    });

    ctx.body = {
      success: true,
      data: statuses['rows'],
      meta: {
        total: statuses['count'],
      },
    };
  }
  catch(error) {

    ctx.status = 500;
    ctx.body = { code: '500', message: error['message'] };
  }
};
