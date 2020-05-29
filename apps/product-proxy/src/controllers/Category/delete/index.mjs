
import request from '@sys.packages/request';
import { sendEvent } from '@sys.packages/rabbit';
import { sequelize, models } from '@sys.packages/db';


export default () => async (ctx) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = ctx['request']['body'];
    const { Category } = models;

    const images = [];
    const result = await Category.findAll({
      where: { id },
      attributes: ['imageId'],
      transaction,
    });

    for (let index in result) {
      if (result.hasOwnProperty(index)) {
        const category = result[index].toJSON();
        if (category['imageId']) {
          images.push(category['imageId']);
        }
      }
    }

    if (images.length) {
      await request({
        url: process.env['GALLERY_API_SRV'] + '/images',
        method: 'delete',
        data: {
          externalId: images,
        }
      });
    }

    await models['Category'].destroy({
      where: { id },
      transaction,
    });

    await sendEvent(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CATEGORY_DELETED'], JSON.stringify(id));

    await transaction.commit();

    ctx.body = {
      success: true,
      data: id,
    };
  }
  catch (error) {

    await transaction.rollback();

    ctx.body = {
      success: false,
      error: {
        code: '500',
        message: error['message'],
      }
    };
  }
};
