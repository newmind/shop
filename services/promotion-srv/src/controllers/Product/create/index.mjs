
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { ProductPromotion } = models;
  const body = ctx['request']['body'];

  const formData = [];
  for (let index in body['promotions']) {
    if (body['promotions'].hasOwnProperty(index)) {
      const promotionId = body['promotions'][index];
      formData.push({
        promotionId: promotionId,
        productUuid: body['productUuid'],
      });
    }
  }

  await ProductPromotion.bulkCreate(formData);

  const result = await ProductPromotion.findAll({
    where: { productUuid: body['productUuid'] },
  });

  ctx.body = {
    success: true,
    data: result.map((item) => item.toJSON()),
  };
};
