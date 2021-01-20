
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Currency } = models;

  const currencies = await Currency.findAll({
    attributes: ['uuid', 'value', 'description'],
    order: [['createdAt', 'desc']],
  });

  ctx.body = {
    success: true,
    data: [
      ...currencies,
    ],
  };
};
