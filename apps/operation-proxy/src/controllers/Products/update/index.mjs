
import { sequelize, models } from '@sys.packages/db';


export default async (fields) => {
  const { uuid } = fields;
  const { Product } = models;

  const productFields = {
    brand: fields['brand'],
    name: fields['name'],
    description: fields['description'],
    status: fields['status'],
    amount: fields['amount'],
    saleAmount: fields['saleAmount'] || 0,
    count: fields['count'],
    isHit: fields['isHit'],
    isSale: fields['isSale'],
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
