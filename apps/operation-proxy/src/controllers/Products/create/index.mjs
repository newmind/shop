
import { sequelize, models } from '@sys.packages/db';


export default async (fields) => {
  const { Product } = models;

  const productFields = {
    uuid: fields['uuid'],
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

  await Product.create(productFields, {
    transaction
  });

  await transaction.commit();
};
