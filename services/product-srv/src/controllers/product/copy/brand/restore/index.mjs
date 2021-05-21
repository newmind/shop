
import { models } from '@sys.packages/db';


export default async function restoreBrand(uuid) {
  const { ProductBrand } = models;

  await ProductBrand.destroy({
    productUuid: uuid,
  });
}
