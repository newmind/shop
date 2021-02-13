
import { sequelize, models } from '@sys.packages/db';


export default async function createProperties(uuid, properties) {
  const { ProductBrand, ProductType, ProductCategory, ProductAttribute } = models;

  const transaction = await sequelize.transaction();

  const attributes = properties['attributes'];
  const newAttributes = attributes.map((item) => {
    return {
      productUuid: uuid,
      attributeId: item['attribute']['id'],
      value: item['value'],
      order: item['order'],
    }
  });

  await ProductAttribute.bulkCreate(newAttributes, { transaction });

  const brands = properties['brands'];
  await ProductBrand.bulkCreate(brands.map((item) => ({
    productUuid: uuid,
    brandId: item['id'],
  })), { transaction });

  const types = properties['types'];
  await ProductType.bulkCreate(types.map((item) => ({
    productUuid: uuid,
    typeId: item['id'],
    order: item['type']['order'],
  })), { transaction });

  const categories = properties['categories'];
  await ProductCategory.bulkCreate(categories.map((item) => ({
    productUuid: uuid,
    categoryId: item['id'],
    order: item['category']['order'],
  })), { transaction });

  await transaction.commit();

  return uuid;
}
