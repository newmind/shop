
import { models } from '@sys.packages/db';


export default async function updateProperties(uuid) {
  const { Gallery } = models;

  await Gallery.destroy({ where: { productUuid: uuid }});
}
