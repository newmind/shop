
import { sequelize, models } from '@sys.packages/db';


export default async function updateProperties(uuid, properties) {
  const { Product, Gallery, ProductBrand, ProductType, ProductCategory, ProductAttribute } = models;

  const transaction = await sequelize.transaction();

  if (properties['gallery'] && !! properties['gallery'].length) {
    await Gallery.destroy({ where: { productUuid: uuid }}, { transaction });

    const newGallery = properties['gallery'].map((item, index) => {
      return {
        uuid: item['uuid'],
        productUuid: uuid,
        order: index,
      }
    });
    await Gallery.bulkCreate(newGallery, { transaction });
  }

  if (properties['attributes'] && !! properties['attributes'].length) {
    await ProductAttribute.destroy({ where: { productUuid: uuid }}, { transaction });

    const newAttributes = properties['attributes'].map((item, index) => {
      return {
        productUuid: uuid,
        attributeId: item['id'],
        value: item['value'],
        use: item['use'],
        order: index,
      }
    });
    await ProductAttribute.bulkCreate(newAttributes, { transaction });
  }

  if (properties['brandId']) {
    await ProductBrand.destroy({ where: { productUuid: uuid }}, { transaction });
    await ProductBrand.create({ productUuid: uuid, brandId: properties['brandId'] }, { transaction })
  }

  if (properties['types'] && !! properties['types'].length) {
    await ProductType.destroy({ where: { productUuid: uuid }}, { transaction });
    await ProductType.bulkCreate(properties['types'].map((item) => ({ productUuid: uuid, typeId: item })), { transaction })
  }

  if (properties['categories'] && !! properties['categories'].length) {
    await ProductCategory.destroy({ where: { productUuid: uuid }}, { transaction });
    await ProductCategory.bulkCreate(properties['categories'].map((item) => ({ productUuid: uuid, categoryId: item })), { transaction })
  }

  const product = {};

  if (properties['name']) {
    product['name'] = properties['name'];
  }

  if (properties['price']) {
    product['price'] = Number(properties['price']);
  }

  if (properties['currencyCode']) {
    product['currencyCode'] = properties['currencyCode'];
  }

  if (properties['description']) {
    product['description'] = properties['description'];
  }

  if (properties['fiscal']) {
    product['fiscal'] = properties['fiscal'];
  }

  if ('isView' in properties) {
    product['isView'] = properties['isView'];
  }

  await Product.update(product, { where: { uuid }, transaction });

  await transaction.commit();
}
