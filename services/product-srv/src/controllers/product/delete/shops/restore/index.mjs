
import { models } from '@sys.packages/db';


export default async function updateProperties(uuid) {
  const { ProductType } = models;

  await ProductType.destroy({ where: { productUuid: uuid }});
}
