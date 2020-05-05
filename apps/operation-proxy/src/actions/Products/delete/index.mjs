
import { sequelize, models } from '@sys.packages/db';


export default async (fields) => {
  const { uuid } = fields;
  const { Product, Gallery } = models;

  const transaction = await sequelize.transaction();

  await Product.destroy({
    where: { uuid },
    transaction,
  });

  await Gallery.destroy({
    where: { uuid },
    transaction,
  });

  await transaction.commit();
};
