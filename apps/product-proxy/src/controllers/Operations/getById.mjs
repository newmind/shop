'use strict';

import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  try {
    const { productId } = ctx.params;
    const { Stock, Units, Currency, Category, Comment, Product, Attribute, Gallery } = models;

    const products = await Stock.findOne({
      attributes: ['id', 'count', 'amount'],
      where: { id: productId },
      order: [
        ['product', 'gallery', 'id', 'ASC']
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
          attributes: ['evaluation', 'person', 'comment', 'createdAt'],
        },
        {
          model: Product,
          attributes: ['id', 'name', 'brand', 'color', 'material', 'form', 'description', 'status'],
          required: true,
          as: 'product',
          where: { status: 1 },
          include: [
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
          ]
        }
      ],
    });

    ctx.body = {
      success: true,
      data: products,
    };
  } catch(error) {
    console.log(error)
  }
};
