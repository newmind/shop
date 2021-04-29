
import { models } from '@sys.packages/db';


export default async function(orderId, data) {
  const { OnlinePayment } = models;

  await OnlinePayment.create({
    orderId: orderId,
    paymentUUID: data['paymentUUID'],
    paymentLink: data['paymentLink'],
  });
}
