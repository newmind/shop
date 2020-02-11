
import { sequelize, models } from '@sys.packages/db';


export default () => async (ctx) => {
  try {
    const { Material } = models;
    const data = ctx['request']['body'];

    const transaction = await sequelize.transaction();

    const result = await Material.create(data, { transaction });

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
