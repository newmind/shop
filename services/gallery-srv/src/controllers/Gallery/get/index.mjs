
import { models } from '@sys.packages/db';

import { Duplex } from 'stream';


export default () => async (ctx) => {
  const { Gallery } = models;
  const { id } = ctx['params'];

  const image = await Gallery.findOne({
    where: { externalId: id },
    attributes: ['file']
  });

  const stream = new Duplex();

  if (image) {
    stream.push(image['file']);
  }

  stream.push(null);

  ctx.status = 200;
  ctx.body = stream;
};
