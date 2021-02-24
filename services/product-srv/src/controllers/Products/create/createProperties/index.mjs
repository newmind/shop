
import { sequelize, models } from '@sys.packages/db';


export default async function createProperties(properties) {
  const { Product, Gallery, ProductBrand, ProductType, ProductCategory, ProductAttribute } = models;

  const transaction = await sequelize.transaction();

  const { uuid } = await Product.create({
    uuid: properties['uuid'],
    name: properties['name'],
    price: properties['price'],
    currencyCode: properties['currencyCode'],
    description: properties['description'],
    fiscal: properties['fiscal'],
  }, {
    transaction,
  });

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

  const newGallery = properties['gallery'].map((item, index) => {
    return {
      uuid: item['uuid'],
      productUuid: uuid,
      order: index,
    }
  });

  await Gallery.bulkCreate(newGallery, { transaction });

  await ProductBrand.create({ productUuid: uuid, brandId: properties['brandId'] }, { transaction })

  await ProductType.bulkCreate(properties['types'].map((item) => ({ productUuid: uuid, typeId: item })), { transaction })
  await ProductCategory.bulkCreate(properties['categories'].map((item) => ({ productUuid: uuid, categoryId: item })), { transaction })

  await transaction.commit();

  return uuid;
}
