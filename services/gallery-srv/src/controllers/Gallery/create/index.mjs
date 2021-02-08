
import { models } from '@sys.packages/db';
import { UUID } from '@sys.packages/utils';

import sharp from 'sharp';


const getBufferFromRequest = (req) => {
  const buffer = [];

  return new Promise((resolve, reject) => {
    req.on('data', (data) => {
      buffer.push(data);
    });

    req.on('error', reject);

    req.on('end', () => {
      resolve(Buffer.concat(buffer));
    });
  });
};

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
  const uuid = UUID();

  const buffer = await getBufferFromRequest(ctx['req']);

  const smallImgBuffer = await resize(buffer, { size: 124 });
  const middleImgBuffer = await resize(buffer, { size: 320 });
  const largeImgBuffer = await resize(buffer, { size: 1024 });

  const fileName = `${uuid}.jpg`;

  console.log(fileName, fileName.length)

  await Gallery.create({
    uuid: fileName,
    small: smallImgBuffer,
    middle: middleImgBuffer,
    large: largeImgBuffer,
  });

  ctx.status = 200;
  ctx.body = {
    success: true,
    data: fileName,
  };
};
