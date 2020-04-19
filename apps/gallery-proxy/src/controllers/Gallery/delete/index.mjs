
import { sequelize, models } from '@sys.packages/db';


export default () => async (ctx) => {
  try {
    const { Gallery } = models;
    const data = ctx['request']['body'];

    const transaction = await sequelize.transaction();

    await Gallery.destroy({
      where: { id: data['id'] },
    }, {
      transaction,
    });

    await transaction.commit();

    ctx.body = {
      success: true,
      data: data['id'],
    };
  }
  catch(e) {

    ctx.status = 500;
    ctx.body = {
      success: false,
      error: {
        code: '500',
        message: e.message,
      }
    };
  }
};
