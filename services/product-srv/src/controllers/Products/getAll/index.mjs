
import { models, Sequelize } from '@sys.packages/db';
import request from "@sys.packages/request";


export default () => async (ctx) => {
  let where = {};
  let whereForTypes = {};
  let whereForCategories = {};
  let whereForBrands = {};
  let offset = {};
  let options = {};

  const { Op } = Sequelize;
  const { Product, Currency, Attribute, Category, Brand, Type, ProductAttribute, Unit, Gallery, Comment } = models;
  const {
    fiscal = null,
    limit = null,
    skip = null,
    take = null,
    uuid = null,
    categoryId = null,
    brandId = null,
    amountFrom = null,
    amountTo = null,
    typeId = null,
    isView = null,
  } = ctx['request']['query'];

  if (isView !== null) {
    where['isView'] = isView;
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
    where['price'] = {
      [Op.gte]: Number(amountFrom)
    };
  } else if (amountTo && ! amountFrom) {
    where['price'] = {
      [Op.lte]: Number(amountTo)
    };
  } else if (amountFrom && amountTo) {
    where['price'] = {
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

  const result = await Product.findAndCountAll({
    attributes: ['uuid', 'name', 'description', 'price', 'fiscal', 'isView', 'createdAt'],
    ...options,
    ...offset,
    distinct: true,
    where: { ...where },
    order: [
      ['createdAt', 'desc'],
      ['gallery', 'order', 'asc'],
      ['comments', 'createdAt', 'desc'],
      ['attributes', 'order', 'asc'],
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
        model: Currency,
        required: false,
        as: 'currency',
        attributes: ['code', 'value']
      },
      {
        model: ProductAttribute,
        required: false,
        as: 'attributes',
        attributes: ['value', 'order', 'use'],
        include: [
          {
            model: Attribute,
            attributes: ['id', 'value'],
            as: 'attribute',
            include: [
              {
                model: Unit,
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

  let products = result['rows'].map((product) => product.toJSON());
  const productUuids = products.map((product) => product['uuid']);

  if ( !! productUuids.length) {

    const { data: promotions } = await request({
      url: process.env['PROMOTION_API_SRV'] + '/products',
      method: 'get',
      params: {
        uuid: productUuids,
      },
    });

    products = products.map((product) => {
      const promotion = promotions.find((promotion) => promotion['productUuid'] === product['uuid']);
      if (promotion) {
        return {
          ...product,
          prevPrice: product['price'],
          price: product['price'] - Math.floor(product['price'] * promotion['percent'] / 100),
        };
      }
      return product;
    });
  }

  ctx.body = {
    success: true,
    data: products,
    meta: {
      total: result['count'],
    },
  };
};
