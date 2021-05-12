
import { models } from '@sys.packages/db';


export default async function updateProperties(uuid, gallery) {
  const { Gallery } = models;

  if (gallery && !! gallery.length) {

    const newGallery = gallery.map((item, index) => ({
      uuid: item['uuid'],
      productUuid: uuid,
      order: index,
    }));
    await Gallery.bulkCreate(newGallery);
  }
}
