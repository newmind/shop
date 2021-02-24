
import { models } from '@sys.packages/db';
import request from '@sys.packages/request';


export default () => async (ctx) => {
  const { Promotion, ProductPromotion } = models;

  const result = await Promotion.findAll({
    order: [
      ['dateFrom', 'asc'],
    ],
    include: [
      {
        model: ProductPromotion,
        attributes: [['productUuid', 'uuid']],
        as: 'products',
      }
    ],
  });

  const promotions = result.map((promo) => promo.toJSON());

  for (let index in promotions) {
    if (promotions.hasOwnProperty(index)) {
      const promotion = promotions[index];
      const products = promotion['products'];

      const result = await request({
        url: process.env['PRODUCT_API_SRV'] + '/products',
        method: 'get',
        params: {
          uuid: products.map(item => item['uuid']),
        },
      });

      promotions[index]['products'] = result['data'];
    }
  }

  ctx.body = {
    success: true,
    data: promotions,
  };
};
