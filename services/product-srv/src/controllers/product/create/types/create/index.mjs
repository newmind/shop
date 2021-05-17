
import { models } from '@sys.packages/db';


export default async function updateProperties(uuid, typeId) {
  const { ProductType } = models;

  await ProductType.create({
    productUuid: uuid,
    typeId,
  });
}
