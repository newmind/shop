
import { models } from '@sys.packages/db';


export default async function updateProperties(uuid) {
  const { ProductBrand } = models;

  await ProductBrand.destroy({ where: { productUuid: uuid }});
}
