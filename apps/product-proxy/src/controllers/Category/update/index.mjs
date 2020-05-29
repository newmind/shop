
import { sendEvent } from '@sys.packages/rabbit';
import { sequelize, models } from '@sys.packages/db';


export default () => async (ctx) => {
  try {
    const { id } = ctx['params'];
    const formDate = ctx['request']['body'];

    const { Category } = models;

    const transaction = await sequelize.transaction();

    await Category.update({
      value: formDate['value'],
      description: formDate['description'],
      imageId: formDate['imageId'],
    }, {
      where: { id, updatedAt: formDate['updatedAt'] },
      transaction
    });

    await transaction.commit();

    const result = await Category.findOne({
      where: { id },
      attributes: ['id', 'value', 'description', 'imageId', 'createdAt', 'updatedAt'],
    });

    await sendEvent(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CATEGORY_UPDATED'], JSON.stringify(result.toJSON()));

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
