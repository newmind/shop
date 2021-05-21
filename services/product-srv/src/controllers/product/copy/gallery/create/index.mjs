
import { models } from '@sys.packages/db';


export default async function updateProperties(uuid, gallery) {
  const { Gallery } = models;

  if (gallery && !! gallery.length) {

    await Gallery.bulkCreate(gallery.map((item, index) => {
      return {
        uuid: item['uuid'],
        productUuid: uuid,
        order: index,
      }
    }));
  }
}
