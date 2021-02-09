
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Status } = models;

  const result = await Status.findAll({
    attributes: ['code', 'name'],
  });

  const statuses = result.map((item) => item.toJSON());

  ctx.body = {
    success: true,
    data: statuses,
  };
};
