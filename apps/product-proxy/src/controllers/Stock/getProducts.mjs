'use strict';

import { models, Sequelize } from '@sys.packages/db';


export default () => async (ctx) => {
  try {
    let where = {};
    let productWhere = {};
    const {Op} = Sequelize;
    const {Stock, Product, Currency, Category, Comment, Attribute, Gallery} = models;
    const {categoryId, brand, amountFrom, amountTo, skip, take} = ctx['request']['query'];
    const offset = {};

    if (categoryId) {
      where['categoryId'] = categoryId;
    }

    if (brand) {
      productWhere['brand'] = brand;
    }

    if (amountFrom && !amountTo) {
      where['amount'] = {
        [Op.gte]: amountFrom
      };
    } else if (amountTo && !amountFrom) {
      where['amount'] = {
        [Op.lte]: amountTo
      };
    } else if (amountFrom && amountTo) {
      where['amount'] = {
        [Op.between]: [amountFrom, amountTo]
      };
    }

    if (skip && take) {
      offset['offset'] = skip;
      offset['limit'] = take;
    }

    const products = await Stock.findAndCountAll({
      attributes: ['id', 'count', 'amount', 'createdAt'],
      where: {...where},
      ...offset,
      distinct: true,
      order: [
        ['createdAt', 'asc'],
        ['product', 'gallery', 'id', 'asc']
      ],
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
          attributes: ['id', 'name', 'brand', 'color', 'material', 'form', 'description', 'status'],
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
        data: products['rows'],
        meta: {
          total: products['count'],
        },
      },
    };
  } catch(error) {

    ctx.throw(new Error(error['message']));
  }
};
