
import { sequelize, models } from '@sys.packages/db';


export default async function updateProperties(uuid, characteristics) {
  const { Characteristic, CharacteristicAttribute } = models;

  const transaction = await sequelize.transaction();

  await Characteristic.destroy({
    where: { productUuid: uuid }
  }, {
    transaction,
  });

  if (characteristics && !! characteristics.length) {

    await Characteristic.bulkCreate(characteristics.map((item) => ({
      name: item['name'],
      productUuid: item['productUuid'],
      order: item['order'],
    })));

    const attributes = [];
    for (let charIndex in characteristics) {
      if (characteristics.hasOwnProperty(charIndex)) {
        const characteristic = characteristics[charIndex];
        for (let attrIndex in characteristic['attributes']) {
          if (characteristic['attributes'].hasOwnProperty(attrIndex)) {
            const attribute = characteristic['attributes'][attrIndex];
            attributes.push({
              characteristicId: characteristic['id'],
              attributeId: attribute['id'],
              value: attribute['value'],
              use: attribute['use'],
              order: attribute['order'],
            });
          }
        }
      }
    }

    await CharacteristicAttribute.bulkCreate(attributes, {
      transaction,
    });
  }

  await transaction.commit();
}
