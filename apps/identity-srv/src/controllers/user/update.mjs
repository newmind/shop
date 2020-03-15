
import { sequelize, models } from '@sys.packages/db';
import { sendEvent } from "@sys.packages/rabbit";


export default () => async (ctx) => {

  try {

    const { Passport } = models;
    const { id } = ctx['params'];
    const { body } = ctx['request'];

    const transaction = await sequelize.transaction();

    await Passport.update(body, {
      where: { userId: id },
      transaction,
    });

    const result = await Passport.findOne({
      where: { userId: id },
      transaction,
    });

    await transaction.commit();

    sendEvent(process.env['RABBIT_IDENTITY_SRV_EXCHANGE_PASSPORT_UPDATED'], JSON.stringify(result.toJSON()));

    ctx.body = {
      success: true,
      data: result.toJSON(),
    };

  } catch(e) {

    ctx.status = 500;
    ctx.body = {
      success: false,
      error: {
        code: 500,
        message: e['message'],
      },
    };
  }
};
