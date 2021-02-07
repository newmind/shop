
import { models, Sequelize } from '@sys.packages/db';


// function calculateProduct(amount, percent) {
//   return Math.ceil(amount - percent * 100 / amount);
// }

export default () => async (ctx) => {
  const { Op } = Sequelize;
  const { Product, Promotion, Currency } = models;
  const { uuid } = ctx['request']['body'];

  let amount = 0;
  let currency = '';

  for (let index in uuid) {
    if (uuid.hasOwnProperty(index)) {
      const item = uuid[index];

      const result = await Product.findOne({
        attributes: ['uuid', 'amount'],
        where: { uuid: item[0] },
        include: [
          {
            model: Promotion,
            as: 'promotions',
            required: false,
            where: {
              dateFrom: { [Op.lte]: new Date() },
              dateTo: { [Op.gte]: new Date() },
            },
            attributes: ['percent'],
            through: { attributes: [] },
          },
          {
            model: Currency,
            as: 'currency',
            attributes: ['value'],
            required: true,
          },
        ],
      });

      const product = result.toJSON();
      const productAmount = product['amount'] * item[1];

      amount += productAmount;
    }
  }

  ctx.body = {
    success: true,
    data: {
      amount,
      currency,
    },
  };
};
