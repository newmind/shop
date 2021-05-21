
import { models } from '@sys.packages/db';


export default async function restoreCategory(uuid) {
  const { ProductCategory } = models;

  await ProductCategory.destroy({
    where: {
      productUuid: uuid,
    },
  });
}
