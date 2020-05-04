
import request from "@sys.packages/request";
import { sendEvent } from '@sys.packages/rabbit';
import { getFiles } from "@sys.packages/sys.utils";
import { sequelize, models } from '@sys.packages/db';


const saveFiles = (files, { productId }, { transaction }) => {
  const { Gallery } = models;

  return new Promise((resolve, reject) => {
    const filesMap = Object.keys(files);

    if ( ! filesMap.length) {
      resolve();
    }

    filesMap.map(async (key, index) => {
      try {
        const fileBuffer = files[key]['buffer'];

        const { data } = await request({
          url: process.env['GALLERY_API_SRV'] + '/images',
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

        await sendEvent(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_GALLERY_CREATED'], JSON.stringify({
          productId,
          externalId: data['externalId'],
        }));

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
    const { uuid } = ctx['params'];
    const { files, fields } = await getFiles(ctx['req']);
    const { Product, Attribute, Units, Gallery, Currency, Category, Type, Color, Material, Form } = models;

    const transaction = await sequelize.transaction();

    await Attribute.destroy({ where: { productId: uuid }}, { transaction });

    const attributes = [...JSON.parse(fields['attributes'])].map(item => {
      delete item['id'];
      item['productId'] = uuid;
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
      where: { uuid },
      transaction,
    });

    await saveFiles(files, { productId: uuid }, { transaction });

    const product = await Product.findOne({
      where: { uuid },
      attributes: ['uuid', 'brand', 'name', 'description', 'status', 'amount', 'saleAmount', 'count', 'params', 'isHit', 'isSale', 'createdAt'],
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
      ],
      transaction
    });

    await sendEvent(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_UPDATED'], JSON.stringify(product.toJSON()));

    await transaction.commit();

    ctx.body = {
      success: true,
      data: product.toJSON(),
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
