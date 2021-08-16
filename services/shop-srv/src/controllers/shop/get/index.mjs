
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Shop } = models;

  const where = {};
  const query = ctx['query'];

  if (query['uuid']) {
    where['uuid'] = query['uuid'];
  }

  const shops = await Shop.findAll({
    where: {
      ...where,
    }
  });

  ctx.body = {
    success: true,
    data: shops.map((item) => item.toJSON()),
  };
};
