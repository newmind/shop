
import logger from '@sys.packages/logger';
import { sequelize, models } from '@sys.packages/db';


export default async (event) => {
  try {
    const fields = JSON.parse(event);
    const {Product} = models;

    const productFields = {
      uuid: fields['uuid'],
      brand: fields['brand'],
      name: fields['name'],
      currencyId: fields['currency']['uuid'],
    };

    const transaction = await sequelize.transaction();

    await Product.create(productFields, {
      transaction
    });

    await transaction.commit();
  }
  catch(error) {

    logger['error'](error);
  }
};
