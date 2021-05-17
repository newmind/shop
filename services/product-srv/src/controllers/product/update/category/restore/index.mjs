
import { sequelize, models } from '@sys.packages/db';


export default async function restoreCategory(uuid, category) {
  const { ProductCategory } = models;

  const transaction = await sequelize.transaction();

  await ProductCategory.destroy({
    where: {
      productUuid: uuid,
    },
    transaction,
  });

  if (category) {
    await ProductCategory.create({
      productUuid: uuid,
      categoryId: category['id'],
    }, {
      transaction,
    });
  }

  await transaction.commit();
}
