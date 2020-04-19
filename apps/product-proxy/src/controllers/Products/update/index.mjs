
import request from "@sys.packages/request";
import { sendEvent } from '@sys.packages/rabbit';
import { getFiles } from "@sys.packages/sys.utils";
import { sequelize, models } from '@sys.packages/db';


const saveFiles = (files, { productId }, { transaction }) => {
  const { Gallery } = models;

  return new Promise((resolve, reject) => {

    Object.keys(files)
      .map(async (key, index) => {
        try {
          const fileBuffer = files[key]['buffer'];

          const { data } = await request({
            url: process.env['GALLERY_SRV'] + '/images',
            method: 'post',
            headers: {
              'Content-type': 'application/octet-stream',
            },
            data: fileBuffer,
          });

          await Gallery.create({
            productId,
            externalId: data['externalId'],
          }, {
            transaction
          });

          if (Object.keys(files).length === index + 1) {
            resolve();
          }
        }
        catch (error) {
          reject(error);
        }
      });
  });
};

export default () => async (ctx) => {
  try {
    const { id } = ctx['params'];
    const { files, fields } = await getFiles(ctx['req']);
    const { Product, Attribute, Units, Gallery, Currency, Category, Type, Color, Material, Form } = models;

    const transaction = await sequelize.transaction();

    await Attribute.destroy({ where: { productId: id }}, { transaction });

    const attributes = [...JSON.parse(fields['attributes'])].map(item => {
      delete item['id'];
      item['productId'] = id;
      item['unitId'] < 0 && delete item['unitId'];
      return item;
    });

    await Attribute.bulkCreate(attributes, { transaction });

    const normalize = {};
    for (let key in fields) {
      if (fields.hasOwnProperty(key)) {
        if (fields[key] === 'null') {
          normalize[key] = null;
        }
        else {
          normalize[key] = fields[key];
        }
      }
    }

    await Product.update(normalize, {
      where: { id },
      transaction,
    });

    await saveFiles(files, { productId: id }, { transaction });

    const product = await Product.findOne({
      where: { id },
      attributes: ['id', 'uuid', 'brand', 'name', 'description', 'status', 'amount', 'saleAmount', 'count', 'params', 'isHit', 'isSale', 'createdAt'],
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
          attributes: ['externalId'],
        },
      ],
      transaction
    });

    await transaction.commit();

    const result = product.toJSON();

    sendEvent(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_UPDATED'], JSON.stringify(result));

    ctx.body = {
      success: true,
      data: result,
    };
  }
  catch(error) {

    ctx.status = 500;
    ctx.body = {
      success: false,
      error: {
        code: '500',
        message: error['message'],
      }
    };
  }
};
