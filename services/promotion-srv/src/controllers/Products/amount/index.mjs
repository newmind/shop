
import { models, Sequelize } from '@sys.packages/db';


// function calculateProduct(amount, percent) {
//   return Math.ceil(amount - percent * 100 / amount);
// }

export default () => async (ctx) => {
  const { Op } = Sequelize;
  const { Product, Promotion, Currency } = models;
  const { uuid } = ctx['request']['body'];

  const amounts = [];
  for (let index in uuid) {
    if (uuid.hasOwnProperty(index)) {
      const item = uuid[index];

      const result = await Product.findOne({
        attributes: ['uuid', 'price'],
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
            attributes: ['code', 'value'],
            required: true,
          },
        ],
      });

      const product = result.toJSON();
      const amountIndex = amounts.findIndex((item) => item[0] === product['currency']['code']);

      if (amountIndex > -1) {
        amounts[amountIndex][1] += product['price'] * item[1]
      }
      else {
        amounts.push([product['currency']['code'], product['price'] * item[1], product['currency']['value']]);
      }
    }
  }

  ctx.body = {
    success: true,
    data: amounts,
  };
};
