
import { Duplex } from 'stream';
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  try {
    const { Gallery } = models;
    const { id } = ctx['params'];

    ctx.res.writeHead(200, {
      "Content-Type": "application/octet-stream",
    });

    const image = await Gallery.findOne({
      where: { id },
      attributes: ['id', 'file']
    });

    const stream = new Duplex();

    stream.push(image['file']);
    stream.push(null);

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
