
import { models } from '@sys.packages/db';


export default async (uuid, data) => {
  const { Shop } = models;

  await Shop.update(data, {
    where: {
      uuid,
    },
  });

  return uuid;
}
