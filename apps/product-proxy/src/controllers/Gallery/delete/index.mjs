
import { sequelize, models } from '@sys.packages/db';


export default async (fields) => {
  const { Gallery } = models;

  const transaction = await sequelize.transaction();

  await Gallery.destroy({
    where: { externalId: fields },
  }, {
    transaction,
  });

  await transaction.commit();
};
