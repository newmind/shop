
import { models } from '@sys.packages/db';


export default async (shopUuid) => {
  const { ShopDelivery } = models;

  await ShopDelivery.destroy({
    where: {
      shopUuid,
    },
  });
}
