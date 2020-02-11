
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  try {
    const { Currency } = models;

    const currencies = await Currency.findAll({
      attributes: ['id', 'value', 'description'],
      order: [['id', 'ASC']],
    });

    ctx.body = {
      success: true,
      data: [
        ...currencies,
      ],
    };
  }
  catch(e) {

    ctx.status = 500;
    ctx.body = {
      success: false,
      error: {
        code: '500',
        message: e.message,
      },
    };
  }
};
