
import { models } from "@sys.packages/db";


export default async function(id) {
  const { Order } = models;

  await Order.destroy({
    where: {
      id,
    }
  });
}
