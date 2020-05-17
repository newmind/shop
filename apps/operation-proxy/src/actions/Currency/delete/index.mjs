
import logger from '@sys.packages/logger';
import { sequelize, models } from '@sys.packages/db';


export default async (event) => {
  try {
    const uuid = JSON.parse(event);
    const { Currency } = models;

    const transaction = await sequelize.transaction();

    await Currency.destroy({
      where: { uuid },
      transaction,
    });

    await transaction.commit();
  }
  catch(error) {

    logger['error'](error);
  }
};
