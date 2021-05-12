
import { sequelize, models } from '@sys.packages/db';


export default async function updateProperties(uuid, categories) {
  const { ProductCategory } = models;

  const transaction = await sequelize.transaction();

  await ProductCategory.destroy({
    where: { productUuid: uuid }
  }, {
    transaction,
  });

  if (categories && !! categories.length) {
    await ProductCategory.bulkCreate(categories.map((item) => ({
      productUuid: uuid,
      categoryId: item,
    })), {
      transaction,
    });
  }

  await transaction.commit();
}
