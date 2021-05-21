
import { sequelize, models } from '@sys.packages/db';


export default async function updateProperties(uuid, options) {
  const { ProductOption } = models;

  const transaction = await sequelize.transaction();

  const result = await ProductOption.findAll({
    where: {
      productUuid: uuid,
    },
    transaction,
  });

  await ProductOption.destroy({
    where: {
      productUuid: uuid,
    },
    transaction,
  });

  if (options && !! options.length) {

      await ProductOption.bulkCreate(options.map((option, index) => ({
        name: option['name'],
        vendor: option['vendor'],
        productUuid: uuid,
        order: index,
        isTarget: option['isTarget'],
      })), {
        transaction,
      });
  }

  await transaction.commit();

  return result.map((row) => row.toJSON());
}
