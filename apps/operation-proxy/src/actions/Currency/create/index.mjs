
import logger from '@sys.packages/logger';
import { sequelize, models } from '@sys.packages/db';


export default async (event) => {
  try {
    const fields = JSON.parse(event);
    const { Currency } = models;

    const currency = {
      uuid: fields['uuid'],
      value: fields['value'],
      description: fields['description'],
    };

    const transaction = await sequelize.transaction();

    await Currency.create(currency, {
      transaction,
    });

    await transaction.commit();
  }
  catch(error) {
    logger['error'](error);
  }
};
