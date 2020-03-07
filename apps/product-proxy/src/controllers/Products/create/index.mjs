
import { sequelize, models } from '@sys.packages/db';
import { getFiles } from "@sys.packages/sys.utils";
import { sendEvent } from "@sys.packages/rabbit";


const saveFiles = (files, { productId }, { transaction }) => {

  const { Gallery } = models;

  return new Promise((resolve) => {

    Object.keys(files)
      .map(async (key, index) => {

        const fileBuffer = files[key]['buffer'];

        await Gallery.create({ productId, file: fileBuffer, order: index }, { transaction });

        if (Object.keys(files).length === index + 1) {
          resolve();
        }
      });
  });
};

export default () => async (ctx) => {
  try {
    const { Product, Attribute, Units, Gallery, Currency, Category, Type, Color, Material, Form } = models;
    const { files, fields } = await getFiles(ctx['req']);

    const transaction = await sequelize.transaction();

    const { id } = await Product.create(fields, { transaction });

    const { attributes = null } = fields;

    if (attributes) {

      const attributes = [...JSON.parse(fields['attributes'])]
        .map(item => {
          item['productId'] = id;
          return item;
        });

      await Attribute.bulkCreate(attributes, { transaction });
    }

    if (Object.keys(files).length) {
      await saveFiles(files, { productId: id }, { transaction });
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
