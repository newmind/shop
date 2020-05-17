
import logger from '@sys.packages/logger';
import { sequelize, models } from '@sys.packages/db';


export default async (event) => {
  try {
    const { uuid, ...fields } = JSON.parse(event);
    const { Product } = models;

    const productFields = {
      brand: fields['brand'],
      name: fields['name'],
      currencyId: fields['currency']['uuid'],
    };
    const transaction = await sequelize.transaction();

    const product = await Product.findOne({ where: { uuid }, transaction });

    if (product) {
      await Product.update(productFields, {
        where: { uuid },
        transaction,
      });
    }
    else {
      await Product.create({ uuid, ...productFields }, {
        transaction
      });
    }

    await transaction.commit();
  }
  catch(error) {

    logger['error'](error);
  }
};
