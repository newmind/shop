
import fs from 'fs';
import path from 'path';
import nodeMailer from 'nodemailer';


export default () => async (ctx) => {
  try {
    const { subject, emailTo, } = ctx['request']['body'];

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

    const template = fs.createReadStream(path.resolve('src/controllers/sendEmail/templates/account.html'));

    const info = await transporter.sendMail({
      from: "\"glassshoprobot@gmail.com 👻\" <glassshoprobot@gmail.com>",
      to: emailTo,
      subject: subject,
      html: template,
      attachments: [{
        path: 'https://xn--80aagcvgokokb0i.xn--p1ai/api/gallery/4',
        cid: 'image'
      }],
    });

    ctx.body = {
      success: true,
      data: info,
    };
  }
  catch (e) {

    ctx.status = 500;
    ctx.body = {
      success: false,
      error: { code: '500', message: e['message'] },
    };
  }
};
