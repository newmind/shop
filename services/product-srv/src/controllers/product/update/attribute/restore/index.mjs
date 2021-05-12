
import { sequelize, models } from '@sys.packages/db';


export default async function updateProperties(uuid, attributes) {
  const { ProductAttribute } = models;

  const transaction = await sequelize.transaction();

  await ProductAttribute.destroy({
    where: { productUuid: uuid }
  }, {
    transaction,
  });

  if (attributes && !! attributes.length) {

    await ProductAttribute.bulkCreate(attributes.map((item) => ({
      productUuid: item['uuid'],
      attributeId: item['id'],
      value: item['value'],
      use: item['use'],
      order: item['order'],
    })), {
      transaction,
    });
  }

  await transaction.commit();
}
