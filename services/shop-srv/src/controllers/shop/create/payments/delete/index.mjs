
import { models } from '@sys.packages/db';


export default async (shopUuid) => {
  const { ShopPayment } = models;

  await ShopPayment.destroy({
    where: {
      shopUuid,
    },
  });
}
