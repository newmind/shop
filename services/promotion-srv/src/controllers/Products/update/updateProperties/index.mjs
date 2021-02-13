
import { sequelize, models } from '@sys.packages/db';


export default async function updateProperties(uuid, properties) {
  const { Product, ProductBrand, ProductType, ProductCategory, ProductAttribute } = models;

  const transaction = await sequelize.transaction();

  await ProductAttribute.destroy({ where: { productUuid: uuid }}, { transaction });

  const attributes = JSON.parse(properties['attributes']);
  const newAttributes = attributes.map((item) => {
    return {
      productUuid: uuid,
      attributeId: item['id'],
      value: item['value'],
    }
  });

  await ProductAttribute.bulkCreate(newAttributes, { transaction });

  await ProductBrand.destroy({ where: { productUuid: uuid }}, { transaction });
  await ProductBrand.create({ productUuid: uuid, brandId: properties['brandId'] }, { transaction })

  await ProductType.destroy({ where: { productUuid: uuid }}, { transaction });
  const types = JSON.parse(properties['types']);
  await ProductType.bulkCreate(types.map((item) => ({ productUuid: uuid, typeId: item })), { transaction })

  await ProductCategory.destroy({ where: { productUuid: uuid }}, { transaction });
  const categories = JSON.parse(properties['categories']);
  await ProductCategory.bulkCreate(categories.map((item) => ({ productUuid: uuid, categoryId: item })), { transaction })

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
