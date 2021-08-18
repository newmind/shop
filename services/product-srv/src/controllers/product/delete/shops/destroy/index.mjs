
import { models } from '@sys.packages/db';


export default async function updateProperties(uuid) {
  const { ProductShop } = models;

  await ProductShop.destroy({
    where: {
      productUuid: uuid,
    },
  });
}
