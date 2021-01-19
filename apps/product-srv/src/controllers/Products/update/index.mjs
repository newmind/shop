
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

        await sendEvent(process.env['RABBIT_PRODUCT_SRV_EXCHANGE_GALLERY_CREATED'], JSON.stringify({
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
  const { uuid } = ctx['params'];
  const { files, fields } = await getFiles(ctx['req']);
  const { Product, Attribute, Units, Gallery, Currency, Category, Type, Color,
    Material, Form, ProductType, ProductCategory, ProductColor, ProductMaterial, ProductForm } = models;

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

  await ProductType.destroy({ where: { productUuid: uuid }}, { transaction });
  await ProductType.bulkCreate(JSON.parse(fields['types']).map(item => ({ productUuid: uuid, typeId: item })), { transaction })

  await ProductCategory.destroy({ where: { productUuid: uuid }}, { transaction });
  await ProductCategory.bulkCreate(JSON.parse(fields['categories']).map(item => ({ productUuid: uuid, categoryId: item })), { transaction })

  await ProductColor.destroy({ where: { productUuid: uuid }}, { transaction });
  await ProductColor.bulkCreate(JSON.parse(fields['colors']).map(item => ({ productUuid: uuid, colorId: item })), { transaction })

  await ProductMaterial.destroy({ where: { productUuid: uuid }}, { transaction });
  await ProductMaterial.bulkCreate(JSON.parse(fields['materials']).map(item => ({ productUuid: uuid, materialId: item })), { transaction })

  await ProductForm.destroy({ where: { productUuid: uuid }}, { transaction });
  await ProductForm.bulkCreate(JSON.parse(fields['forms']).map(item => ({ productUuid: uuid, formId: item })), { transaction })

  await Product.update(normalize, {
    where: { uuid },
    transaction,
  });

  await saveFiles(files, { productId: uuid }, { transaction });

  const product = await Product.findOne({
    where: { uuid },
    attributes: ['uuid', 'brand', 'name', 'description', 'status', 'amount', 'saleAmount', 'params', 'createdAt'],
    include: [
      {
        model: Type,
        as: 'types',
        attributes: ['id', 'value'],
        through: { attributes: [] },
      },
      {
        model: Category,
        as: 'categories',
        attributes: ['id', 'value'],
        through: { attributes: [] },
      },
      {
        model: Color,
        as: 'colors',
        attributes: ['id', 'value'],
        through: { attributes: [] },
      },
      {
        model: Material,
        as: 'materials',
        attributes: ['id', 'value'],
        through: { attributes: [] },
      },
      {
        model: Form,
        as: 'forms',
        attributes: ['id', 'value'],
        through: { attributes: [] },
      },
      {
        model: Currency,
        as: 'currency',
        attributes: ['uuid', 'value']
      },
      {
        model: Attribute,
        as: 'attributes',
        attributes: ['id', 'name', 'value'],
        include: [
          {
            model: Units,
            as: 'unit',
            attributes: ['id', 'value']
          }
        ]
      },
      {
        model: Gallery,
        as: 'gallery',
        attributes: ['externalId'],
      },
    ],
    transaction
  });

  await sendEvent(process.env['RABBIT_PRODUCT_SRV_EXCHANGE_PRODUCT_UPDATED'], JSON.stringify(product.toJSON()));

  await transaction.commit();

  ctx.body = {
    success: true,
    data: product.toJSON(),
  };
};
