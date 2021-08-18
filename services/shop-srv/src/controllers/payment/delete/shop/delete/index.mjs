
import { models } from '@sys.packages/db';


export default async (uuid) => {
  const { Shop } = models;

  await Shop.destroy({
    where: {
      uuid,
    },
  });
}
