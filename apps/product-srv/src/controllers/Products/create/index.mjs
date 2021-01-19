
import request from '@sys.packages/request';
import { sendEvent } from "@sys.packages/rabbit";
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
  const { Product, Attribute, Units, Gallery, Currency, Category, Type, Color, Material, Form,
  ProductType, ProductCategory, ProductColor, ProductMaterial, ProductForm } = models;
  const { files = [], fields = {}} = await getFiles(ctx['req']);
  const { attributes = null } = fields;
try {
  const transaction = await sequelize.transaction();

  const { uuid } = await Product.create(fields, {transaction});

  await saveFiles(files, { productId: uuid }, {transaction});

  await ProductType.bulkCreate(JSON.parse(fields['types']).map(item => ({ productUuid: uuid, typeId: item })), { transaction })
  await ProductCategory.bulkCreate(JSON.parse(fields['categories']).map(item => ({ productUuid: uuid, categoryId: item })), { transaction })
  await ProductColor.bulkCreate(JSON.parse(fields['colors']).map(item => ({ productUuid: uuid, colorId: item })), { transaction })
  await ProductMaterial.bulkCreate(JSON.parse(fields['materials']).map(item => ({ productUuid: uuid, materialId: item })), { transaction })
  await ProductForm.bulkCreate(JSON.parse(fields['forms']).map(item => ({ productUuid: uuid, formId: item })), { transaction })

  if (attributes) {

    const attributes = [...JSON.parse(fields['attributes'])]
      .map(item => {
        item['productId'] = uuid;
        return item;
      });

    await Attribute.bulkCreate(attributes, {transaction});
  }

  await transaction.commit();

  const result = await Product.findOne({
    where: {uuid},
    attributes: ['uuid', 'brand', 'name', 'description', 'params', 'status', 'amount', 'saleAmount', 'count', 'createdAt'],
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
  });

  await sendEvent(process.env['RABBIT_PRODUCT_SRV_EXCHANGE_PRODUCT_CREATED'], JSON.stringify(result.toJSON()));

  ctx.body = {
    success: true,
    data: result.toJSON(),
  };
}
catch (e) {
  console.log(e)
}
};
