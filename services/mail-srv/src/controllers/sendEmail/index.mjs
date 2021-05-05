
import logger from "@sys.packages/logger";

import nodeMailer from 'nodemailer';
import nunjucks from "nunjucks";


export default () => async () => {
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

  const html = nunjucks.render('client-order/created/index.html', {
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
