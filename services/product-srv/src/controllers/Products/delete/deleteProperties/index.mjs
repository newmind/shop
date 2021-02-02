
import { sequelize, models } from '@sys.packages/db';


export default async function updateProperties(uuid) {
  const { Gallery, Product, ProductBrand, ProductType, ProductCategory, ProductAttribute } = models;

  const transaction = await sequelize.transaction();

  await ProductAttribute.destroy({ where: { productUuid: uuid }}, { transaction });
  await ProductCategory.destroy({ where: { productUuid: uuid }}, { transaction });
  await ProductType.destroy({ where: { productUuid: uuid }}, { transaction });
  await ProductBrand.destroy({ where: { productUuid: uuid }}, { transaction });
  await Gallery.destroy({ where: { productUuid: uuid }, transaction });
  await Product.destroy({ where: { uuid }, transaction });

  await transaction.commit();
}
