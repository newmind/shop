
import { models, Sequelize } from '@sys.packages/db';


export default () => async (ctx) => {
  let where = {};
  let whereForTypes = {};
  let whereForCategories = {};
  let whereForColors = {};
  let whereForMaterials = {};
  let whereForForms = {};
  let offset = {};
  let options = {};

  const { Op } = Sequelize;
  const { Product, Currency, Category, Type, Attribute, Units, Gallery, Comment, Promotion } = models;
  const {
    fiscal = null,
    status = null,
    limit = null,
    skip = null,
    take = null,
    uuid = null,
    categoryId = null,
    brand = null,
    amountFrom = null,
    amountTo = null,
    colorId = null,
    formId = null,
    materialId = null,
    typeId = null,
    createdFrom,
    createdTo,
  } = ctx['request']['query'];

  if (status) {
    where['status'] = status;
  }

  if (fiscal) {
    where['fiscal'] = fiscal;
  }

  if (uuid) {
    where['uuid'] = uuid;
  }

  if (brand) {
    where['brand'] = brand;
  }

  if (typeId) {
    if (/^\d+$/.test(typeId)) {
      whereForTypes['id'] = Number(typeId);
    }
    else {
      whereForTypes['id'] = typeId;
    }
  }

  if (categoryId) {
    if (/^\d+$/.test(categoryId)) {
      whereForCategories['id'] = Number(categoryId);
    }
    else {
      whereForCategories['id'] = categoryId;
    }
  }

  if (colorId) {
    if (/^\d+$/.test(colorId)) {
      whereForColors['id'] = Number(colorId);
    }
    else {
      whereForColors['id'] = colorId;
    }
  }

  if (materialId) {
    if (/^\d+$/.test(materialId)) {
      whereForMaterials['id'] = Number(materialId);
    }
    else {
      whereForMaterials['id'] = materialId;
    }
  }

  if (formId) {
    if (/^\d+$/.test(formId)) {
      whereForForms['id'] = Number(formId);
    }
    else {
      whereForForms['id'] = formId;
    }
  }

  if (amountFrom && ! amountTo) {
    where['amount'] = {
      [Op.gte]: Number(amountFrom)
    };
  } else if (amountTo && ! amountFrom) {
    where['amount'] = {
      [Op.lte]: Number(amountTo)
    };
  } else if (amountFrom && amountTo) {
    where['amount'] = {
      [Op.between]: [Number(amountFrom), Number(amountTo)]
    };
  }

  if (createdFrom && ! createdTo) {
    where['createdAt'] = {
      [Op.gte]: createdFrom
    };
  } else if (createdTo && ! createdFrom) {
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
    attributes: ['uuid', 'brand', 'name', 'description', 'status', 'amount', 'saleAmount', 'fiscal', 'updatedAt'],
    ...options,
    ...offset,
    distinct: true,
    where: { ...where },
    order: [
      ['updatedAt', 'desc'],
      ['comments', 'createdAt', 'desc'],
    ],
    include: [
      {
        model: Type,
        required: !! whereForTypes['id'],
        as: 'types',
        where: { ...whereForTypes },
        attributes: ['id', 'value'],
        through: {
          attributes: [],
          order: [['order', 'asc']],
          as: 'type',
        },
      },
      {
        model: Category,
        required: !! whereForCategories['id'],
        as: 'categories',
        where: { ...whereForCategories },
        attributes: ['id', 'value'],
        through: {
          attributes: [],
          order: [['order', 'asc']],
          as: 'category',
        },
      },
      {
        model: Promotion,
        required: false,
        as: 'promotions',
        attributes: ['uuid', 'name', 'percent'],
        where: {
          dateFrom: {
            [Sequelize.Op.lte]: new Date(),
          },
          dateTo: {
            [Sequelize.Op.gte]: new Date(),
          },
        },
        through: { attributes: [] },
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
        attributes: ['value'],
        through: {
          attributes: ['value', 'attributeId'],
          order: [['order', 'asc']],
          as: 'attribute',
        },
        include: [
          {
            model: Units,
            required: false,
            as: 'unit',
            attributes: ['value']
          }
        ]
      },
      {
        model: Gallery,
        as: 'gallery',
        attributes: ['uuid'],
      },
      {
        model: Comment,
        as: 'comments',
        attributes: ['id', 'evaluation', 'person', 'comment', 'createdAt'],
      }
    ],
  });

  ctx.body = {
    success: true,
    data: products['rows'],
    meta: {
      total: products['count'],
    },
  };
};
