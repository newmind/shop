
import { sequelize, models } from '@sys.packages/db';


export default async function updateProperties(uuid, attributes) {
  const { ProductAttribute } = models;

  const transaction = await sequelize.transaction();

  const result = await ProductAttribute.findAll({
    where: { productUuid: uuid },
    transaction,
  });

  await ProductAttribute.destroy({
    where: { productUuid: uuid },
  }, {
    transaction,
  });

  if (attributes && !! attributes.length) {

    const newAttributes = attributes.map((item, index) => {
      return {
        productUuid: uuid,
        attributeId: item['id'],
        value: item['value'],
        use: item['use'],
        order: index,
      }
    });
    await ProductAttribute.bulkCreate(newAttributes, { transaction });
  }

  await transaction.commit();

  return result.map((row) => row.toJSON());
}
