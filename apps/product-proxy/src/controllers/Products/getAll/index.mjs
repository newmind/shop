
import { models, Sequelize } from '@sys.packages/db';


export default () => async (ctx) => {
  try {
    let where = {};
    let offset = {};
    let options = {};

    const { Op } = Sequelize;
    const { Product, Attribute, Units, Gallery, Currency, Category, Type, Color, Material, Form, Comment } = models;
    const {
      status = null, limit = null, skip = null, take = null,
      uuid = null, id = null, categoryId = null, brand = null, amountFrom = null,
      amountTo = null, colorId = null, formId = null, materialId = null,
    } = ctx['request']['query'];

    if (status) {
      where['status'] = status;
    }

    if (id) {
      where['id'] = id;
    }

    if (uuid) {
      where['uuid'] = uuid;
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

    if (limit) {
      options['limit'] = limit;
    }

    if (skip && take) {
      offset['offset'] = skip;
      offset['limit'] = take;
    }

    const products = await Product.findAndCountAll({
      attributes: ['id', 'uuid', 'brand', 'name', 'description', 'status', 'amount', 'saleAmount', 'count', 'params', 'isHit', 'isSale', 'createdAt'],
      distinct: true,
      subQuery: false,
      ...options,
      ...offset,
      where: { ...where },
      include: [
        {
          model: Category,
          required: false,
          as: 'category',
          attributes: ['id', 'value']
        },
        {
          model: Type,
          required: false,
          as: 'type',
          attributes: ['id', 'value']
        },
        {
          model: Material,
          required: false,
          as: 'material',
          attributes: ['id', 'value']
        },
        {
          model: Color,
          required: false,
          as: 'color',
          attributes: ['id', 'value']
        },
        {
          model: Form,
          required: false,
          as: 'form',
          attributes: ['id', 'value']
        },
        {
          model: Currency,
          required: false,
          as: 'currency',
          attributes: ['id', 'value']
        },
        {
          model: Attribute,
          required: false,
          as: 'attributes',
          attributes: ['id', 'name', 'value'],
          include: [
            {
              model: Units,
              required: false,
              as: 'unit',
              attributes: ['id', 'value']
            }
          ]
        },
        {
          model: Gallery,
          required: false,
          as: 'gallery',
          attributes: ['id'],
        },
        {
          model: Comment,
          required: false,
          as: 'comments',
          attributes: ['evaluation', 'person', 'comment', 'createdAt'],
        },
      ],
    });

    ctx.body = {
      success: true,
      data: products['rows'],
      meta: {
        total: products['count'],
      },
    };
  }
  catch (error) {

    ctx.status = 500;
    ctx.body = { success: false, error: { code: '500', message: error['message'] }};
  }
};
