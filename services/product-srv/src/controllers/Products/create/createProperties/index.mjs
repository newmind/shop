
import { sequelize, models } from '@sys.packages/db';


export default async function createProperties(properties) {
  const { Product, ProductBrand, ProductType, ProductCategory, ProductAttribute } = models;

  const transaction = await sequelize.transaction();

  const { uuid } = await Product.create({
    uuid: properties['uuid'],
    name: properties['name'],
    amount: properties['amount'],
    currencyId: properties['currencyId'],
    description: properties['description'],
    saleAmount: properties['saleAmount'],
    fiscal: properties['fiscal'],
  }, {
    transaction,
  });

  const attributes = JSON.parse(properties['attributes']);
  const newAttributes = attributes.map((item) => {
    return {
      productUuid: uuid,
      attributeId: item['id'],
      value: item['value'],
    }
  });

  await ProductAttribute.bulkCreate(newAttributes, { transaction });

  await ProductBrand.create({ productUuid: uuid, brandId: properties['brandId'] }, { transaction })

  const types = JSON.parse(properties['types']);
  await ProductType.bulkCreate(types.map((item) => ({ productUuid: uuid, typeId: item })), { transaction })

  const categories = JSON.parse(properties['categories']);
  await ProductCategory.bulkCreate(categories.map((item) => ({ productUuid: uuid, categoryId: item })), { transaction })

  await transaction.commit();

  return uuid;
}
