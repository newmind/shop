
import { sequelize, models } from '@sys.packages/db';


export default async function restoreType(uuid, type) {
  const { ProductType } = models;

  const transaction = await sequelize.transaction();

  await ProductType.destroy({
    where: {
      productUuid: uuid,
    },
    transaction,
  });

  if (type) {
    await ProductType.create({
      productUuid: uuid,
      typeId: type['id'],
    }, {
      transaction,
    });
  }

  await transaction.commit();
}
