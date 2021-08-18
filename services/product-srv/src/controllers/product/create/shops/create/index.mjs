
import { models } from '@sys.packages/db';


export default async function updateProperties(uuid, shops) {
  const { ProductShop} = models;

  await ProductShop.bulkCreate(shops.map((shop) => ({
    productUuid: uuid,
    shopUuid: shop['shopUuid'],
    number: Number(shop['number']),
  })));
}
