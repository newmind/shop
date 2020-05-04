
import { sequelize, models } from '@sys.packages/db';


export default async (formData) => {
  try {
    const { Currency } = models;

    const currency = {
      uuid: formData['uuid'],
      value: formData['value'],
      description: formData['description'],
    };

    const transaction = await sequelize.transaction();

    await Currency.create(currency, {
      transaction,
    });

    await transaction.commit();
  }
  catch(e) {
    console.log(e);
  }
};
