
import { models } from '@sys.packages/db';


export default async (shopUuid) => {
  const { ShopPayment } = models;

  const result = await ShopPayment.findAll({
    where: {
      shopUuid,
    },
  });

  return result.map((item) => {
    const payment = item.toJSON();
    return {
      code: payment['paymentCode'],
      status: payment['isUse'],
    };
  });
}
