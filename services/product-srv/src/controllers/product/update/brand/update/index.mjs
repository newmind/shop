
import { sequelize, models } from '@sys.packages/db';


export default async function updateProperties(uuid, brandId) {
  const { ProductBrand } = models;

  const transaction = await sequelize.transaction();

  const result = await ProductBrand.findOne({
    where: { productUuid: uuid },
    transaction,
  });

  await ProductBrand.destroy({
    where: { productUuid: uuid }
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

  return result.toJSON();
}
