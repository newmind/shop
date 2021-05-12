
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const where = {};
  const { ProductPromotion } = models;
  const { id, productUuid } = ctx['request']['body'];

  if (id) {
    where['id'] = id;
  }

  if (productUuid) {
    where['productUuid'] = productUuid;
  }

  await ProductPromotion.destroy({
    where,
  });

  ctx.body = {
    success: true,
    data: id || productUuid,
  };
};
