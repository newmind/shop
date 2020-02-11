
import { models, sequelize, Sequelize } from '@sys.packages/db';


export default () => async (ctx) => {
  try {
    const where = {};

    const { Op } = Sequelize;
    const { Product, Form } = models;
    const {
      status = null, categoryId = null, brand = null, amountFrom = null,
      amountTo = null, colorId = null, materialId = null,
    } = ctx['request']['query'];

    if (status) {
      where['status'] = status;
    }

    if (categoryId) {
      where['categoryId'] = categoryId;
    }

    if (brand) {
      where['brand'] = brand;
    }

    if (colorId) {
      where['colorId'] = colorId;
    }

    if (materialId) {
      where['materialId'] = materialId;
    }

    if (amountFrom && ! amountTo) {
      where['amount'] = {
        [Op.gte]: amountFrom
      };
    } else if (amountTo && ! amountFrom) {
      where['amount'] = {
        [Op.lte]: amountTo
      };
    } else if (amountFrom && amountTo) {
      where['amount'] = {
        [Op.between]: [amountFrom, amountTo]
      };
    }

    const result = await Form.findAll({
      raw: true,
      group: ['Form.id'],
      attributes: ['id', 'value', [sequelize.fn('COUNT', sequelize.col('product.formId')), 'count']],
      include: [
        {
          model: Product,
          required: false,
          as: 'product',
          attributes: [],
          where: { ...where },
        }
      ],
    });

    ctx.body = {
      success: true,
      data: result,
    };
  }
  catch(e) {

    ctx.status = 500;
    ctx.body = {
      success: false,
      error: { code: '500', message: e.message }
    };
  }
};
