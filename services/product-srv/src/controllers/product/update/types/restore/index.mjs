
import { sequelize, models } from '@sys.packages/db';


export default async function updateProperties(uuid, types) {
  const { ProductType } = models;

  const transaction = await sequelize.transaction();

  await ProductType.destroy({
    where: { productUuid: uuid }
  }, {
    transaction,
  });

  if (types && !! types.length) {
    await ProductType.bulkCreate(types.map((item) => ({
      productUuid: uuid,
      typeId: item,
    })), {
      transaction,
    });
  }

  await transaction.commit();
}
