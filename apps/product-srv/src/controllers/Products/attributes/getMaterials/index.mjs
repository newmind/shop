
import {models, sequelize, Sequelize } from '@sys.packages/db';


export default () => async (ctx) => {
  const where = {};

  const { Op } = Sequelize;
  const { Product, Material } = models;
  const {
    status = null, categoryId = null, brand = null, amountFrom = null,
    amountTo = null, colorId = null, formId = null, typeId = null,
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

  if (colorId) {
    where['colorId'] = colorId;
  }

  if (formId) {
    where['formId'] = formId;
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

  const result = await Material.findAll({
    distinct: true,
    group: ['Material.id'],
    attributes: ['id', 'value', [sequelize.fn('COUNT', sequelize.col('product.materialId')), 'count']],
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
};
