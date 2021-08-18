
import { sequelize, models } from '@sys.packages/db';


export default async function restoreBrand(uuid, shops) {
  const { ProductShop } = models;

  const transaction = await sequelize.transaction();

  await ProductShop.destroy({
    where: {
      productUuid: uuid,
    },
    transaction,
  });

  if ( !! shops.length) {
    await ProductShop.bulkCreate(shops.map((shop) => ({
      productUuid: uuid,
      shopUuid: shop['shopUuid'],
      number: shop['number'],
    })), {
      transaction,
    });
  }

  await transaction.commit();
}
