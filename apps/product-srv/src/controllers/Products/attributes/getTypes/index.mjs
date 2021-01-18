
import { models, sequelize, Sequelize } from '@sys.packages/db';


export default () => async (ctx) => {
  const where = {};

  const { Op } = Sequelize;
  const { ProductType, Type } = models;
  const {
    status = null, categoryId = null, brand = null, amountFrom = null,
    amountTo = null, colorId = null, formId = null, typeId = null,
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

  if (formId) {
    where['formId'] = formId;
  }

  if (formId) {
    where['typeId'] = typeId;
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

  const result = await Type.findAll({
    distinct: true,
    group: ['Type.id'],
    attributes: ['id', 'value', [sequelize.fn('COUNT', sequelize.col('product_types.typeId')), 'count']],
    include: [
      {
        model: ProductType,
        as: 'product_types',
        attributes: [],
        include: [

        ],
      }
    ],
  });

  ctx.body = {
    success: true,
    data: result,
  };
};
