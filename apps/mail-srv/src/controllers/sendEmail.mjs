'use strict';

import nodeMailer from 'nodemailer';


export default () => async (ctx) => {

  const { subject, emailTo, } = ctx.request.body;

  console.log(subject, emailTo);

  const transporter = nodeMailer.createTransport({
    host: process.env['EMAIL_HOST'],
    port: process.env['EMAIL_PORT'],
    secure: true,
    auth: {
      user: process.env['EMAIL_USER'],
      pass: process.env['EMAIL_PASSWORD'],
    }
  });

  const info = await transporter.sendMail({
    from: "\"glassshoprobot@gmail.com 👻\" <glassshoprobot@gmail.com>",
    to: emailTo,
    subject: subject,
    html: "<b>Hello world?</b>",
  });

  ctx.body = {
    success: true,
    data: info,
  };
};
