
import { sequelize, models } from '@sys.packages/db';


export default () => async (ctx) => {
  try {
    const { Color } = models;
    const { id } = ctx['params'];
    const data = ctx['request']['body'];

    const transaction = await sequelize.transaction();

    const result = await Color.update(data, {
      where: { id },
      transaction
    });

    await transaction.commit();

    ctx.body = {
      success: true,
      data: result.toJSON(),
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
