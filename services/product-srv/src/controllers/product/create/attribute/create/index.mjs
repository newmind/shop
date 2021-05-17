
import { sequelize, models } from '@sys.packages/db';


export default async function updateProperties(uuid, characteristics) {
  const { Characteristic, CharacteristicAttribute } = models;

  const transaction = await sequelize.transaction();

  if (characteristics && !! characteristics.length) {

    for (let index in characteristics) {
      if (characteristics.hasOwnProperty(index)) {
        const characteristic = characteristics[index];

        const { id } = await Characteristic.create({
          name: characteristic['name'],
          productUuid: uuid,
          order: index,
        }, {
          transaction,
        });

        const newAttributes = characteristic['attributes'].map((item, index) => {
          return {
            characteristicId: id,
            attributeId: item['id'],
            value: item['value'],
            use: item['use'],
            order: index,
          }
        });

        await CharacteristicAttribute.bulkCreate(newAttributes, {
          transaction,
        });
      }
    }
  }

  await transaction.commit();
}
