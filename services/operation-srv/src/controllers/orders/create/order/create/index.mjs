
import { models } from '@sys.packages/db';
import { UUID } from '@sys.packages/utils';


export default async function(customerId, data) {
  const { Order } = models;

  const externalId = UUID();

  const result = await Order.create({
    externalId,
    customerId,
    paymentCode: data['payment'],
    deliveryCode: data['delivery'],
    currencyCode: data['currencyCode'],
    statusCode: 100,
    price: data['price'],
  });

  return result.toJSON();
}
