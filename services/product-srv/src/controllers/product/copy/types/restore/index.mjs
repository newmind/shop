
import { models } from '@sys.packages/db';


export default async function restoreType(uuid) {
  const { ProductType } = models;

  await ProductType.destroy({
    where: {
      productUuid: uuid,
    },
  });
}
