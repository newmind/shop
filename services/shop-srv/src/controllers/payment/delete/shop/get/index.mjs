
import { models } from '@sys.packages/db';


export default async (uuid) => {
  const { Shop } = models;

  const result = await Shop.findAll({
    where: {
      uuid,
    },
  });

  return result.map((item) => item.toJSON());
}
