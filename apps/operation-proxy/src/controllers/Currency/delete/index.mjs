
import { sequelize, models } from '@sys.packages/db';


export default async (uuid) => {
  try {
    const { Currency } = models;

    const transaction = await sequelize.transaction();

    await Currency.destroy({
      where: { uuid },
      transaction,
    });

    await transaction.commit();
  }
  catch(e) {

    console.log(e);
  }
};
