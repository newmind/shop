
import { models } from '@sys.packages/db';


export default async function updateProperties(uuid) {
  const { ProductAttribute } = models;

  await ProductAttribute.destroy({ where: { productUuid: uuid }});
}
