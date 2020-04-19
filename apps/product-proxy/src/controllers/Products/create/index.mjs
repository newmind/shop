
import request from '@sys.packages/request';
import { sendEvent } from "@sys.packages/rabbit";
import { sequelize, models } from '@sys.packages/db';
import { getFiles, UUID } from "@sys.packages/sys.utils";


const saveFiles = (files, { productId }, { transaction }) => {
  const { Gallery } = models;

  return new Promise((resolve, reject) => {

    Object.keys(files)
      .map(async (key, index) => {
        try {
          const fileBuffer = files[key]['buffer'];
          const uuid = UUID();

          const result = await request({
            url: process.env['GALLERY_SRV'] + '/images',
            method: 'post',
            headers: {
              'Content-type': 'application/octet-stream',
            },
            data: fileBuffer,
          });

          console.log(result)

          await Gallery.create({
            productId,
            externalId: uuid,
            order: index,
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
    const { Product, Attribute, Units, Gallery, Currency, Category, Type, Color, Material, Form } = models;
    const { files = [], fields = {}} = await getFiles(ctx['req']);
    const { attributes = null } = fields;

    const transaction = await sequelize.transaction();

    const { id } = await Product.create(fields, { transaction });

    if (Object.keys(files).length) {
      await saveFiles(files, { ctx, productId: id }, { transaction });
    }

    if (attributes) {

      const attributes = [...JSON.parse(fields['attributes'])]
        .map(item => {
          item['productId'] = id;
          return item;
        });

      await Attribute.bulkCreate(attributes, { transaction });
    }

    await transaction.commit();

    const result = await Product.findOne({
      where: { id },
      attributes: ['id', 'uuid', 'brand', 'name', 'description', 'status', 'amount', 'saleAmount', 'count', 'isHit', 'isSale', 'createdAt'],
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
      ],
    });

    sendEvent(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_CREATED'], JSON.stringify(result.toJSON()));

    ctx.body = {
      success: true,
      data: result.toJSON(),
    };
  }
  catch (e) {

    ctx.status = 500;
    ctx.body = {
      success: false,
      error: {
        code: '500',
        message: e.message,
      },
    };
  }
};
