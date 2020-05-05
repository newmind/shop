
import logger from '@sys.packages/logger';
import { sequelize, models } from '@sys.packages/db';


export default async (event) => {
  try {
    const fields = JSON.parse(event);
    const { Currency } = models;
    const uuid = fields['uuid'];

    const currencyFields = {
      value: fields['value'],
      description: fields['description'],
    };

    const transaction = await sequelize.transaction();

    const currency = await Currency.findOne({ where: { uuid }, transaction });

    if (currency) {
      await Currency.update(currencyFields, {
        where: { uuid },
        transaction,
      });
    }
    else {
      await Currency.create({
        uuid,
        ...currencyFields,
      }, {
        transaction
      });
    }

    await transaction.commit();
  }
  catch(error) {

    logger['error'](error);
  }
};
