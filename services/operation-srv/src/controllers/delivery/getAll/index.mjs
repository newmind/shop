
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Delivery } = models;

  const result = await Delivery.findAll({
    attributes: ['code', 'name'],
  });

  const deliveries = result.map((item) => item.toJSON());

  ctx.body = {
    success: true,
    data: deliveries,
  };
};
