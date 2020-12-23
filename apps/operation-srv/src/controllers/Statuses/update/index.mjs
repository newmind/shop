
import { sequelize, models } from '@sys.packages/db';
import { sendEvent } from '@sys.packages/rabbit';


export default () => async (ctx) => {
  try {
    const { statusId } = ctx['params'];
    const fields = ctx['request']['body'];

    const { Status } = models;
    const transaction = await sequelize.transaction();

    const status = await Status.update({
      where: { id: statusId },
    }, {
      name: fields['name'],
      description: fields['description'],
    }, {
      transaction
    });

    await sendEvent(process.env['RABBIT_OPERATION_PROXY_EXCHANGE_STATUS_UPDATED'], JSON.stringify(status.toJSON()));

    await transaction.commit();

    ctx.body = {
      success: true,
      data: status.toJSON(),
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
