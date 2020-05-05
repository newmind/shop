
import logger from '@sys.packages/logger';
import { sequelize, models } from '@sys.packages/db';


export default async (event) => {
  try {
    const fields = JSON.parse(event);
    const { Gallery } = models;

    const transaction = await sequelize.transaction();

    await Gallery.destroy({
      where: { externalId: fields },
    }, {
      transaction,
    });

    await transaction.commit();
  }
  catch(error) {

    logger['error'](error);
  }
};
