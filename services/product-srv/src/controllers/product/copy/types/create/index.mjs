
import { models } from '@sys.packages/db';


export default async function updateProperties(uuid, type) {
  const { ProductType } = models;

  await ProductType.create({
    productUuid: uuid,
    typeId: type['id'],
  });
}
