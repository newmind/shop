
import { sequelize, models } from '@sys.packages/db';
import { sendEvent } from '@sys.packages/rabbit';


export default () => async (ctx) => {
  try {
    const { id } = ctx['request']['body'];

    const { Status } = models;
    const transaction = await sequelize.transaction();

    await Status.destroy({
      where: { id },
      transaction
    });

    await sendEvent(process.env['RABBIT_OPERATION_PROXY_EXCHANGE_STATUS_DELETED'], JSON.stringify(id));

    await transaction.commit();

    ctx.body = {
      success: true,
      data: id,
    };
  }
  catch (error) {

    ctx.status = 500;
    ctx.body = {
      success: false,
      error: {
        code: 500,
        message: error['message'],
      }
    };
  }
};
