
import { models } from '@sys.packages/db';


export default async (shopUuid, data) => {
  const { ShopPayment } = models;

  const paymentStatuses = data.map((item) => ({
    shopUuid: shopUuid,
    paymentCode: item['code'],
    isUse: item['status'],
  }));

  await ShopPayment.bulkCreate(paymentStatuses);
}
