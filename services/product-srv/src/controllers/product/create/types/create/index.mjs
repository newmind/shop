
import { models } from '@sys.packages/db';


export default async function updateProperties(uuid, types) {
  const { ProductType } = models;

  if (types && !! types.length) {

    await ProductType.bulkCreate(types.map((item) => ({
      productUuid: uuid,
      typeId: item,
    })));
  }
}
