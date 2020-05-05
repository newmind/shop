
import { sequelize, models } from '@sys.packages/db';


export default async (fields) => {
  const { uuid } = fields;
  const { Product } = models;

  console.log(fields)

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
    await Product.create({
      uuid: fields['uuid'],
      ...productFields,
    }, {
      transaction
    });
  }

  await transaction.commit();
};
