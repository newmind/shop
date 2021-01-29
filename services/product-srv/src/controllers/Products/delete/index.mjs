
import { sendEvent } from "@sys.packages/rabbit";
import { sequelize, models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { uuid } = ctx['request']['body'];
  const { Product, ProductAttribute, ProductType, ProductCategory, Gallery } = models;

  const transaction = await sequelize.transaction();

  await ProductAttribute.destroy({ where: { productUuid: uuid }}, { transaction });
  await ProductCategory.destroy({ where: { productUuid: uuid }}, { transaction });
  await ProductType.destroy({ where: { productUuid: uuid }}, { transaction });
  await Gallery.destroy({ where: { productUuid: uuid }, transaction });
  await Product.destroy({ where: { uuid }, transaction });

  await transaction.commit();

  await sendEvent(process.env['EXCHANGE_PRODUCT_DELETE'], JSON.stringify(uuid));

  ctx.body = {
    success: true,
    data: uuid,
  };
};
