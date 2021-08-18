
import { models } from '@sys.packages/db';


export default async (data) => {
  const { Shop } = models;

  const result = await Shop.create(data);
  const shop = result.toJSON();

  return shop['uuid'];
}
