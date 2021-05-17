
import { sequelize, models } from '@sys.packages/db';


export default async function updateProperties(uuid, typeId) {
  const { ProductType } = models;

  const transaction = await sequelize.transaction();

  const result = await ProductType.findOne({
    where: {
      productUuid: uuid,
    },
    transaction,
  });

  await ProductType.destroy({
    where: {
      productUuid: uuid,
    },
    transaction,
  });

  if (typeId) {

    await ProductType.create({
      productUuid: uuid,
      typeId,
    }, {
      transaction,
    });
  }

  await transaction.commit();

  return result ? result.toJSON() : null;
}
