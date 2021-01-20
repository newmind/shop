
import logger from '@sys.packages/logger';

import nunjucks from 'nunjucks';
import nodeMailer from 'nodemailer';


export default () => async (message) => {
  try {
    // const fields = JSON.parse(message);

    const transporter = nodeMailer.createTransport({
      host: process.env['EMAIL_HOST'],
      port: process.env['EMAIL_PORT'],
      ssl: true,
      tls: false,
      auth: {
        user: process.env['EMAIL_USER'],
        pass: process.env['EMAIL_PASSWORD'],
      }
    });

    const html = nunjucks.render('order/created/index.html', {
      username: 'James'
    });

    const info = await transporter.sendMail({
      from: "glassshoprobot@gmail.com",
      to: 'pyatakov.viktor@gmail.com',
      subject: 'Новый заказ',
      html,
      attachments: [],
    });

    logger['info'](info);
  }
  catch(error) {

    logger['error'](error['message']);
  }
}
