
import { models } from '@sys.packages/db';


export default async function updateProperties(uuid) {
  const { ProductOption } = models;

  await ProductOption.destroy({
    where: {
      productUuid: uuid,
    },
  });
}
