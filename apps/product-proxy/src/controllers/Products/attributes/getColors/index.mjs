
import {models, sequelize, Sequelize } from '@sys.packages/db';


export default () => async (ctx) => {
  try {
    const where = {};

    const { Op } = Sequelize;
    const { Product, Color } = models;
    const {
      status = null, categoryId = null, brand = null, amountFrom = null,
      amountTo = null, formId = null, materialId = null, typeId = null,
    } = ctx['request']['query'];

    if (status) {
      where['status'] = status;
    }

    if (typeId) {
      where['typeId'] = typeId;
    }

    if (categoryId) {
      where['categoryId'] = categoryId;
    }

    if (brand) {
      where['brand'] = brand;
    }

    if (formId) {
      where['formId'] = formId;
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

    const result = await Color.findAll({
      raw: true,
      group: ['Color.id'],
      attributes: ['id', 'value', [sequelize.fn('COUNT', sequelize.col('product.colorId')), 'count']],
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
