
import { models } from '@sys.packages/db';


export default async (shops) => {
  const { Shop } = models;

  await Shop.bulkCreate(shops);
}
