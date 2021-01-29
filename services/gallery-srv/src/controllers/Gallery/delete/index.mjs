
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const data = ctx['request']['body'];
  const { Gallery } = models;

  await Gallery.destroy({ where: { uuid: data['uuid'] }});

  ctx.body = {
    success: true,
    data,
  };
};
