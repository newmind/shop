
import { models } from '@sys.packages/db';


export default async (uuid) => {
  const { Shop } = models;

  const result = await Shop.findOne({
    where: {
      uuid,
    },
  });

  return result.toJSON();
}
