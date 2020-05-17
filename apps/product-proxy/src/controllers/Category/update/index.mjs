
import { sendEvent } from '@sys.packages/rabbit';
import { sequelize, models } from '@sys.packages/db';


export default () => async (ctx) => {
  try {
    const { id } = ctx['params'];
    const formDate = ctx['request']['body'];

    const transaction = await sequelize.transaction();

    await models['Category'].update(formDate, {
      where: { id },
      transaction
    });

    const result = await models['Category'].findOne({
      where: { id },
      transaction
    });

    await sendEvent(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CATEGORY_UPDATED'], JSON.stringify(result.toJSON()));

    await transaction.commit();

    ctx.body = {
      success: true,
      data: result.toJSON(),
    };
  }
  catch(error) {

    ctx.status = 500;
    ctx.body = {
      success: false,
      error: {
        code: '500',
        message: error['message'],
      }};
  }
};
