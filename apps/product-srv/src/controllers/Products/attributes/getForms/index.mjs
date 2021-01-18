
import { models, sequelize, Sequelize } from '@sys.packages/db';


export default () => async (ctx) => {
  const where = {};

  const { Op } = Sequelize;
  const { ProductForm, Form } = models;
  const {
    status = null, categoryId = null, brand = null, amountFrom = null,
    amountTo = null, colorId = null, materialId = null, typeId = null,
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
    distinct: true,
    group: ['Form.id'],
    attributes: ['id', 'value', [sequelize.fn('COUNT', sequelize.col('product_forms.formId')), 'count']],
    include: [
      {
        model: ProductForm,
        as: 'product_forms',
        attributes: [],
      },
    ],
  });

  ctx.body = {
    success: true,
    data: result,
  };
};
