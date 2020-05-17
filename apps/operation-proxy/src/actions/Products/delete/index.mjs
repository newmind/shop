
import logger from '@sys.packages/logger';
import { sequelize, models } from '@sys.packages/db';


export default async (event) => {
  try {
    const { uuid } = JSON.parse(event);
    const { Product, Gallery } = models;

    const transaction = await sequelize.transaction();

    await Product.destroy({
      where: {uuid},
      transaction,
    });

    await Gallery.destroy({
      where: {uuid},
      transaction,
    });

    await transaction.commit();
  }
  catch(error) {

    logger['error'](error);
  }
};
