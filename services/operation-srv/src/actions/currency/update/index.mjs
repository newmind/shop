
import { models, sequelize } from '@sys.packages/db';


export default async function (data) {
  const { Currency } = models;
  const transaction = await sequelize.transaction();

  const currency = await Currency.findOne({
    where: {
      code: data['code'],
    },
    transaction,
  });

  if (currency) {
    await Currency.update(data, {
      where: {
        code: data['code'],
      },
      transaction,
    });
  }
  else {
    await Currency.create(data, {
      transaction,
    });
  }

  await transaction.commit();
}