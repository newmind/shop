
import { sequelize, models } from '@sys.packages/db';


export default async function updateProperties(uuid, properties) {
  const { Product, Gallery, ProductBrand, ProductType, ProductCategory, ProductAttribute } = models;

  const transaction = await sequelize.transaction();

  await Gallery.destroy({ where: { productUuid: uuid }}, { transaction });

  const newGallery = properties['gallery'].map((item, index) => {
    return {
      uuid: item['uuid'],
      productUuid: uuid,
      order: index,
    }
  });

  console.log(newGallery)

  await Gallery.bulkCreate(newGallery, { transaction });

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

  await ProductBrand.destroy({ where: { productUuid: uuid }}, { transaction });
  await ProductBrand.create({ productUuid: uuid, brandId: properties['brandId'] }, { transaction })

  await ProductType.destroy({ where: { productUuid: uuid }}, { transaction });
  await ProductType.bulkCreate(properties['types'].map((item) => ({ productUuid: uuid, typeId: item })), { transaction })

  await ProductCategory.destroy({ where: { productUuid: uuid }}, { transaction });
  await ProductCategory.bulkCreate(properties['categories'].map((item) => ({ productUuid: uuid, categoryId: item })), { transaction })

  await Product.update({
    name: properties['name'],
    price: properties['price'],
    currencyCode: properties['currencyCode'],
    description: properties['description'],
    fiscal: properties['fiscal'],
  }, {
    where: { uuid },
    transaction,
  });

  await transaction.commit();
}
