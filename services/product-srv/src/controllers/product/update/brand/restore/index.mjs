
import { sequelize, models } from '@sys.packages/db';


export default async function restoreBrand(uuid, brand) {
  const { ProductBrand } = models;

  const transaction = await sequelize.transaction();

  await ProductBrand.destroy({
    where: {
      productUuid: uuid,
    },
    transaction,
  });

  if (brand) {
    await ProductBrand.create({
      productUuid: uuid,
      brandId: brand['id'],
    }, {
      transaction,
    });
  }

  await transaction.commit();
}
