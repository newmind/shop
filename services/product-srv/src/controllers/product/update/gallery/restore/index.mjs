
import { sequelize, models } from '@sys.packages/db';


export default async function updateProperties(uuid, gallery) {
  const { Gallery } = models;

  const transaction = await sequelize.transaction();

  await Gallery.destroy({ where: { productUuid: uuid }}, { transaction });

  if (gallery && !! gallery.length) {
    await Gallery.bulkCreate(gallery.map((img) => ({
      uuid: img['uuid'],
      productUuid: img['productUuid'],
      order: img['order'],
    })), {
      transaction,
    });
  }

  await transaction.commit();
}
