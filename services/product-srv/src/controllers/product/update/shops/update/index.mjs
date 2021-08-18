
import { sequelize, models } from '@sys.packages/db';


export default async function updateProperties(uuid, shops) {
  const { ProductShop} = models;

  const transaction = await sequelize.transaction();

  const result = await ProductShop.findAll({
    where: { productUuid: uuid },
    transaction,
  });

  await ProductShop.destroy({
    where: {
      productUuid: uuid,
    },
    transaction,
  });

  await ProductShop.bulkCreate(shops.map((shop) => ({
    productUuid: uuid,
    shopUuid: shop['shopUuid'],
    number: Number(shop['number']),
  })), {
    transaction,
  });

  await transaction.commit();

  return !! result.length ? result.map((shop) => shop.toJSON()) : null;
}
