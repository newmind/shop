
import request from '@sys.packages/request';
import { sendEvent } from "@sys.packages/rabbit";
import { sequelize, models } from '@sys.packages/db';


export default () => async (ctx) => {
  try {
    const fields = ctx['request']['body'];

    const { Status } = models;
    const transaction = await sequelize.transaction();

    const { id } = await Status.create({
      name: fields['name'],
      description: fields['description'],
    }, {
      transaction
    });

    const status = await Status.findOne({
      where: { id },
      attributes: ['id', 'name', 'description', 'createdAt', 'updatedAt'],
    });

    await sendEvent(process.env['RABBIT_OPERATION_PROXY_EXCHANGE_STATUS_CREATED'], JSON.stringify(status.toJSON()));

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
