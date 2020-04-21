
import { sequelize, models } from '@sys.packages/db';


export default async (fields) => {
  const { Gallery } = models;

  const galleryFields = {
    externalId: fields['externalId'],
    productId: fields['productId'],
  };

  const transaction = await sequelize.transaction();

  await Gallery.create(galleryFields, {
    transaction,
  });

  await transaction.commit();
};
