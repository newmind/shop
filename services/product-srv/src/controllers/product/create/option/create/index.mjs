
import { sequelize, models } from '@sys.packages/db';


export default async function updateProperties(uuid, options) {
  const { ProductOption } = models;

  const transaction = await sequelize.transaction();

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
}
