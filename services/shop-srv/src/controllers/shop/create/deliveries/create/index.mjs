
import { models } from '@sys.packages/db';


export default async (shopUuid, data) => {
  const { ShopDelivery } = models;

  const deliveryStatuses = data.map((item) => ({
    shopUuid: shopUuid,
    deliveryCode: item['code'],
    isUse: item['status'],
  }));

  await ShopDelivery.bulkCreate(deliveryStatuses);
}
