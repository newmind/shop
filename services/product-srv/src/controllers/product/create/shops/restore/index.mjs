
import { models } from '@sys.packages/db';


export default async function restoreBrand(uuid) {
  const { ProductShop } = models;

  await ProductShop.destroy({
    where: {
      productUuid: uuid,
    },
  });
}
