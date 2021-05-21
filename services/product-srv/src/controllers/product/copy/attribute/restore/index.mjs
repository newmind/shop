
import { sequelize, models } from '@sys.packages/db';


export default async function updateProperties(uuid) {
  const { Characteristic, CharacteristicAttribute } = models;

  const transaction = await sequelize.transaction();

  const result = await Characteristic.findAll({
    where: {
      productUuid: uuid,
    },
    transaction,
  });

  await Characteristic.destroy({
    where: {
      productUuid: uuid,
    },
    transaction,
  });

  await CharacteristicAttribute.destroy({
    where: {
      characteristicId: result.map((char) => char['id']),
    },
    transaction,
  });

  await transaction.commit();
}
