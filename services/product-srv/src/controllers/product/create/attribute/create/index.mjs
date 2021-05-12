
import { models } from '@sys.packages/db';


export default async function updateProperties(uuid, attributes) {
  const { ProductAttribute } = models;

  if (attributes && !! attributes.length) {

    const newAttributes = attributes.map((item, index) => ({
      productUuid: uuid,
      attributeId: item['id'],
      value: item['value'],
      use: item['use'],
      order: index,
    }));
    await ProductAttribute.bulkCreate(newAttributes);
  }
}
