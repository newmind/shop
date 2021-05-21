
import { models } from '@sys.packages/db';


export default async function updateCategory(uuid, category) {
  const { ProductCategory } = models;

  await ProductCategory.create({
    productUuid: uuid,
    categoryId: category['id'],
  });
}
