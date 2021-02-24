
import { models } from '@sys.packages/db';
import { UUID } from '@sys.packages/utils';
import { getFiles } from '@sys.packages/utils';

import sharp from 'sharp';


async function resize(buffer, options) {
  return await sharp(buffer)
    .resize(options['size'])
    .jpeg({
      quality: 85,
    })
    .toBuffer();
}


export default () => async (ctx) => {
  const { Gallery } = models;
  const { files } = await getFiles(ctx['req']);

  const bulkImages = [];
  for (let index in files) {
    if (files.hasOwnProperty(index)) {
      const uuid = UUID();
      const file = files[index];

      const smallImgBuffer = await resize(file['buffer'], { size: 124 });
      const middleImgBuffer = await resize(file['buffer'], { size: 320 });
      const largeImgBuffer = await resize(file['buffer'], { size: 1024 });

      const fileName = `${uuid}.jpg`;

      bulkImages.push({
        uuid: fileName,
        name: file['fileName']
          ? file['fileName'].replace(/(\.\w+)$/, '').slice(0, 31)
          : null,
        small: smallImgBuffer,
        middle: middleImgBuffer,
        large: largeImgBuffer,
      });
    }
  }

  await Gallery.bulkCreate(bulkImages);

  ctx.status = 200;
  ctx.body = {
    success: true,
    data: bulkImages.map((img) => ({ uuid: img['uuid'], name: img['name'] })),
  };
};
