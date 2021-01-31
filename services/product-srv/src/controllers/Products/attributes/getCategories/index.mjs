
import { models, Sequelize, sequelize } from '@sys.packages/db';


export default () => async (ctx) => {
  const where = {};

  const { Op } = Sequelize;
  const { ProductCategory, Category } = models;
  const {
    status = null, brand = null, amountFrom = null, typeId = null,
    amountTo = null, colorId = null, formId = null, materialId = null,
  } = ctx['request']['query'];

  if (status) {
    where['status'] = status;
  }

  if (brand) {
    where['brand'] = brand;
  }

  if (typeId) {
    where['typeId'] = typeId;
  }

  if (colorId) {
    where['colorId'] = colorId;
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

  const result = await Category.findAll({
    distinct: true,
    group: ['Category.id'],
    order: [['value', 'asc']],
    attributes: ['id', 'value', [sequelize.fn('COUNT', sequelize.col('product_categories.categoryId')), 'count']],
    include: [
      {
        model: ProductCategory,
        as: 'product_categories',
        attributes: [],
      }
    ],
  });

  ctx.body = {
    success: true,
    data: result,
  };
};
