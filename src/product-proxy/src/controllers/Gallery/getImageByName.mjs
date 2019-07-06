'use strict';

import { Duplex } from 'stream';
import { models } from '@packages/db';


export default () => async (ctx) => {

  const { Gallery } = models;
  const { fileName } = ctx['params'];

  ctx.res.writeHead(200, {
    "Content-Type": "application/octet-stream",
  });

  const image = await Gallery.findOne({
    where: { id: fileName },
    attributes: ['file']
  });

  console.log(image['file'])

  const stream = new Duplex();

  stream.push(image['file']);
  stream.push(null);

  ctx.body = stream;
};
