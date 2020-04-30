
import { Duplex } from 'stream';
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  try {
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
  }
  catch(e) {

    ctx.status = 500;
    ctx.body = {
      success: false,
      error: {
        code: '500',
        message: e.message,
      },
    };
  }
};
