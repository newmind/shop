
import { sequelize, models } from '@sys.packages/db';


export default async function createProperties(uuid, properties) {
  const { ProductBrand, ProductType, ProductCategory, ProductAttribute, Gallery } = models;

  const transaction = await sequelize.transaction();

  const gallery = properties['gallery'].map((item, index) => {
    return {
      productUuid: uuid,
      uuid: item['uuid'],
      order: index,
    }
  });
  await Gallery.bulkCreate(gallery, { transaction });

  const attributes = properties['attributes'].map((item) => {
    return {
      productUuid: uuid,
      attributeId: item['attribute']['id'],
      value: item['value'],
      order: item['order'],
    }
  });
  await ProductAttribute.bulkCreate(attributes, { transaction });

  const brands = properties['brands'];
  await ProductBrand.bulkCreate(brands.map((item) => ({
    productUuid: uuid,
    brandId: item['id'],
  })), { transaction });

  const types = properties['types'].map((item, index) => ({
    productUuid: uuid,
    typeId: item['id'],
    order: index,
  }));
  await ProductType.bulkCreate(types, { transaction });

  const categories = properties['categories'];
  await ProductCategory.bulkCreate(categories.map((item, index) => ({
    productUuid: uuid,
    categoryId: item['id'],
    order: index,
  })), { transaction });

  await transaction.commit();

  return uuid;
}
