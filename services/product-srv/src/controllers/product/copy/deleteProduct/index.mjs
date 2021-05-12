
import { sequelize, models } from '@sys.packages/db';


export default async function deleteProduct(uuid) {
  const { Product, Gallery, ProductType, ProductCategory, ProductAttribute } = models;

  const transaction = await sequelize.transaction();

  await Product.destroy({ where: { uuid }}, { transaction });

  await Gallery.destroy({ where: { productUuid: uuid }}, { transaction });
  await ProductType.destroy({ where: { productUuid: uuid }}, { transaction });
  await ProductCategory.destroy({ where: { productUuid: uuid }}, { transaction });
  await ProductAttribute.destroy({ where: { productUuid: uuid }}, { transaction });

  await transaction.commit();
}
