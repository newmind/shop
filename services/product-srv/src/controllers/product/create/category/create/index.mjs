
import { models } from '@sys.packages/db';


export default async function updateProperties(uuid, categories) {
  const { ProductCategory } = models;

  if (categories && !! categories.length) {

    await ProductCategory.bulkCreate(categories.map((item) => ({
      productUuid: uuid,
      categoryId: item,
    })));
  }
}
