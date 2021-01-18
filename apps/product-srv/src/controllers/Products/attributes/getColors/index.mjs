
import {models, sequelize, Sequelize } from '@sys.packages/db';


export default () => async (ctx) => {
  const where = {};

  const { Op } = Sequelize;
  const { ProductColor, Color } = models;
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
    distinct: true,
    group: ['Color.id'],
    attributes: ['id', 'value', [sequelize.fn('COUNT', sequelize.col('product_colors.colorId')), 'count']],
    include: [
      {
        model: ProductColor,
        as: 'product_colors',
        attributes: [],
      }
    ],
  });

  ctx.body = {
    success: true,
    data: result,
  };
};
