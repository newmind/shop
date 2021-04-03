
import { models } from '@sys.packages/db';


export default async function(orderId) {
  const { Product } = models;

  await Product.destroy({
    where: {
      orderId,
    },
  });
}
