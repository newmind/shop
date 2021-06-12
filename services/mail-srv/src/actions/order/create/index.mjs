
import logger from '@sys.packages/logger';

import nunjucks from 'nunjucks';
import nodeMailer from 'nodemailer';

import builderData from './builds/data.mjs';


export default async (data) => {
console.log(data)
  const transporter = nodeMailer.createTransport({
    host: process.env['EMAIL_HOST'],
    port: Number(process.env['EMAIL_PORT']),
    ssl: true,
    tls: false,
    auth: {
      user: process.env['EMAIL_USER'],
      pass: process.env['EMAIL_PASSWORD'],
    }
  });

  const html = nunjucks.render('order/created/index.html', builderData({
    domain: process.env['DOMAIN'],
    ...data,
  }));

  const info = await transporter.sendMail({
    from: "1krug.com " + process.env['EMAIL_USER'],
    to: data['meta']['email'],
    subject: 'Заказ на 1krug.com',
    html,
    date: new Date(),
    attachments: data['products'].map((product) => ({
      path: product['preview'],
      cid: product['uuid'],
    })),
  });

  logger['info'](info);
}
