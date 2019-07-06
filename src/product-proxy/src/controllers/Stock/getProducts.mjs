'use strict';

import { models, Sequelize } from '@packages/db';


export default () => async (ctx) => {

  let where = {};
  let productWhere = {};
  const { Op } = Sequelize;
  const { Stock, Product, Currency, Category, Comment, Attribute, Gallery } = models;
  const { categoryId, brand, amountFrom, amountTo } = ctx.request.query;

  if (categoryId) {
    where['categoryId'] = categoryId;
  }

  if (brand) {
    productWhere['brand'] = brand;
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

  const products = await Stock.findAll({
    attributes: ['id', 'count', 'amount'],
    where: { ...where },
    order: [['id', 'DESC']],
    include: [
      {
        model: Currency,
        required: false,
        as: 'currency',
        attributes: ['id', 'value']
      },
      {
        model: Category,
        required: false,
        as: 'category',
        attributes: ['id', 'name']
      },
      {
        model: Comment,
        required: false,
        as: 'comments',
        attributes: ['evaluation', 'person', 'comment'],
      },
      {
        model: Product,
        attributes: ['id', 'name', 'brand', 'description', 'status'],
        required: true,
        as: 'product',
        where: { status: 1, ...productWhere },
        include: [
          {
            model: Attribute,
            required: false,
            as: 'attributes',
            attributes: ['id', 'name', 'value'],
          },
          {
            model: Gallery,
            required: false,
            as: 'gallery',
            attributes: ['id'],
          },
        ]
      }
    ],
  });

  ctx.body = {
    success: true,
    data: {
      products: products,
      count: products['count'],
    },
  };
};
