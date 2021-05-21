
import { models } from '@sys.packages/db';


export default async function updateProperties(uuid, brand) {
  const { ProductBrand } = models;

  await ProductBrand.create({
    productUuid: uuid,
    brandId: brand['id'],
  });
}
