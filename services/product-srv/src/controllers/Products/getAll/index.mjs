
import { models, Sequelize } from '@sys.packages/db';


export default () => async (ctx) => {
  let where = {};
  let whereForTypes = {};
  let whereForCategories = {};
  let whereForBrands = {};
  let offset = {};
  let options = {};

  const { Op } = Sequelize;
  const { Product, Currency, Attribute, Category, Brand, Type, ProductAttribute, Units, Gallery, Comment, Promotion } = models;
  const {
    fiscal = null,
    status = null,
    limit = null,
    skip = null,
    take = null,
    uuid = null,
    categoryId = null,
    brandId = null,
    amountFrom = null,
    amountTo = null,
    typeId = null,
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

  if (brandId) {
    whereForBrands['id'] = brandId;
  }

  if (typeId) {
    whereForTypes['id'] = typeId;
  }

  if (categoryId) {
    whereForCategories['id'] = categoryId;
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

  if (limit) {
    options['limit'] = Number(limit);
  }

  if (skip && take) {
    offset['offset'] = Number(skip);
    offset['limit'] = Number(take);
  }

  const products = await Product.findAndCountAll({
    attributes: ['uuid', 'name', 'description', 'status', 'amount', 'fiscal', 'updatedAt'],
    ...options,
    ...offset,
    distinct: true,
    where: { ...where },
    order: [
      ['updatedAt', 'desc'],
      ['gallery', 'order', 'desc'],
      ['comments', 'createdAt', 'desc'],
    ],
    include: [
      {
        model: Brand,
        required: !! whereForBrands['id'],
        as: 'brands',
        where: { ...whereForBrands },
        attributes: ['id', 'value'],
        through: {
          attributes: [],
          order: [['order', 'asc']],
          as: 'brand',
        },
      },
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
        model: ProductAttribute,
        required: false,
        as: 'attributes',
        attributes: ['value', 'order'],
        include: [
          {
            model: Attribute,
            attributes: ['id', 'value'],
            as: 'attribute',
            include: [
              {
                model: Units,
                required: false,
                as: 'unit',
                attributes: ['value']
              }
            ]
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
