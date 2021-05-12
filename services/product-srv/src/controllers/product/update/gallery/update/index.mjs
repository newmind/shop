
import { sequelize, models } from '@sys.packages/db';


export default async function updateProperties(uuid, gallery) {
  const { Gallery } = models;

  const transaction = await sequelize.transaction();

  const result = await Gallery.findAll({
    where: { productUuid: uuid },
    transaction,
  });

  await Gallery.destroy({ where: { productUuid: uuid }}, { transaction });
  if (gallery && !! gallery.length) {
    const newGallery = gallery.map((item, index) => {
      return {
        uuid: item['uuid'],
        productUuid: uuid,
        order: index,
      }
    });
    await Gallery.bulkCreate(newGallery, { transaction });
  }

  await transaction.commit();

  return result.map((row) => row.toJSON());
}
