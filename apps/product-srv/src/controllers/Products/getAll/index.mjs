
import { models, Sequelize } from '@sys.packages/db';


export default () => async (ctx) => {
  try {
    let where = {};
    let offset = {};
    let options = {};

    const {Op} = Sequelize;
    const {Product, Attribute, Units, Gallery, Currency, Category, Type, Color, Material, Form, Comment} = models;
    const {
      createdFrom = null, createdTo = null,
      status = null, limit = null, skip = null, take = null,
      uuid = null, categoryId = null, brand = null, amountFrom = null,
      amountTo = null, colorId = null, formId = null, materialId = null, typeId = null,
    } = ctx['request']['query'];

    if (status) {
      where['status'] = status;
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

    if (typeId) {
      where['typeId'] = typeId;
    }

    if (amountFrom && !amountTo) {
      where['amount'] = {
        [Op.gte]: Number(amountFrom)
      };
    } else if (amountTo && !amountFrom) {
      where['amount'] = {
        [Op.lte]: Number(amountTo)
      };
    } else if (amountFrom && amountTo) {
      where['amount'] = {
        [Op.between]: [Number(amountFrom), Number(amountTo)]
      };
    }

    if (createdFrom && !createdTo) {
      where['createdAt'] = {
        [Op.gte]: createdFrom
      };
    } else if (createdTo && !createdFrom) {
      where['createdAt'] = {
        [Op.lte]: createdTo
      };
    } else if (createdFrom && createdTo) {
      where['createdAt'] = {
        [Op.between]: [createdFrom, createdTo]
      };
    }

    if (limit) {
      options['limit'] = Number(limit);
    }

    if (skip && take) {
      offset['offset'] = Number(skip);
      offset['limit'] = Number(take);
    }

    const products = await Product.findAndCountAll({
      attributes: ['uuid', 'brand', 'name', 'description', 'status', 'amount', 'saleAmount', 'count', 'params', 'createdAt'],
      ...options,
      ...offset,
      distinct: true,
      where: {...where, count: {[Op.gt]: 0}},
      order: [
        ['createdAt', 'desc'],
        ['comments', 'createdAt', 'desc']
      ],
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
          attributes: ['uuid', 'value']
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
          attributes: ['externalId'],
        },
        {
          model: Comment,
          required: false,
          as: 'comments',
          attributes: ['id', 'evaluation', 'person', 'comment', 'createdAt'],
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
  } catch (err) {
    console.log(err)
  }
};
