
import { sequelize, models } from '@sys.packages/db';


export default async function updateProperties(uuid, characteristics) {
  const { Characteristic, CharacteristicAttribute } = models;

  if (characteristics && !! characteristics.length) {

    const transaction = await sequelize.transaction();

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

        await CharacteristicAttribute.bulkCreate(characteristic['attributes'].map((item, index) => {
          return {
            characteristicId: id,
            attributeId: item['attribute']['id'],
            value: item['value'],
            use: item['use'],
            order: index,
          };
        }), {
          transaction,
        });
      }
    }

    await transaction.commit();
  }
}
