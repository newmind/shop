
import { models } from '@sys.packages/db';


export default async (shopUuid) => {
  const { ShopDelivery } = models;

  const result = await ShopDelivery.findAll({
    where: {
      shopUuid,
    },
  });

  return result.map((item) => {
    const delivery = item.toJSON();
    return {
      code: delivery['deliveryCode'],
      status: delivery['isUse'],
    };
  });
}
