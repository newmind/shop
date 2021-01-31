
import { sequelize, models } from '@sys.packages/db';
// import { sendEvent } from "@sys.packages/rabbit2";


export default () => async (ctx) => {
  const { ProductPromotion } = models;
  const { uuid } = ctx['params'];
  const formData = ctx['request']['body'];

  const transaction = await sequelize.transaction();

  await ProductPromotion.destroy({ where: { productUuid: uuid }, transaction});

  if (formData['promotionUuid']) {
    await ProductPromotion.create({
      productUuid: uuid,
      promotionUuid: formData['promotionUuid'],
    }, { transaction });
  }

  await transaction.commit();

  ctx.body = {
    success: true,
    data: null,
  };
};
