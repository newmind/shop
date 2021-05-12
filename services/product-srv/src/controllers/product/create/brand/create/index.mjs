
import { models } from '@sys.packages/db';


export default async function updateProperties(uuid, brandId) {
  const { ProductBrand } = models;

  if (brandId) {

    await ProductBrand.create({
      productUuid: uuid,
      brandId: brandId,
    });
  }
}
