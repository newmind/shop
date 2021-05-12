
import { sequelize, models } from '@sys.packages/db';


export default async function updateProperties(uuid, brandId) {
  const { ProductBrand } = models;

  const transaction = await sequelize.transaction();

  await ProductBrand.destroy({
    where: { productUuid: uuid, brandId }
  }, {
    transaction,
  });

  if (brandId) {
    await ProductBrand.create({
      productUuid: uuid,
      brandId: brandId,
    }, {
      transaction,
    });
  }

  await transaction.commit();
}
