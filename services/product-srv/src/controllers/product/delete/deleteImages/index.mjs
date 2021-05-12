
import { models } from '@sys.packages/db';
import request from "@sys.packages/request";


export default async function saveImages(uuid) {
  const { Gallery } = models;

  const result = await Gallery.findAll({
    row: true,
    attributes: ['uuid'],
    where: { productUuid: uuid },
  });

  const images = result.map((img) => img.toJSON())

  await request({
    url: process.env['GALLERY_API_SRV'] + '/images',
    method: 'delete',
    data: {
      uuid: images.map(img => img['uuid']),
    },
  });
};
