import { User } from "~~/server/models/user-model";
import { Quote } from "~~/server/models/quote-model";
import nodemailer from 'nodemailer';
import { emailTransport, emailFrom } from '~~/server/config/config';


const sendEmail = (data) => {
  const transporter = nodemailer.createTransport(emailTransport);
  const message = {
    from: emailFrom,
    to: 'v.kushnir22@yandex.ru',
    subject: 'Text Test',
    text: 'dsdsdsds',
    html: "<p>" + data.email + "</p>",
    // attachments: [
    //   {
    //     filename: orderFilename + ".pdf",
    //     path: pdfPath,
    //   },
    // ],
  };

  const sendMailResponse = transporter.sendMail(message);
  console.log('sendMailResponse ', sendMailResponse)
}

export default defineEventHandler( async (event) => {
    
    const body = await readBody(event)
    console.log('body: ' + JSON.stringify(body))
    if (body.mode === 'quote') {
      const newUserToDB = new Quote(body);
      const newUserSave = await newUserToDB.save();
      console.log('newUserSave ', newUserSave)
      return {
        success: true,
        message: 'Thank you for contacting us. We will contact you as soon as possible!'
      }
    } else {
      const candidate = await User.findOne({email: body.email, phone: body.phone});
      if (!candidate) {
        const newUserToDB = new User(body);
        const newUserSave = await newUserToDB.save();
        console.log('newUserSave ', newUserSave)
        ///
        sendEmail(body)
        return {
          success: true,
          status: 'success',
          message: 'Thank you for contacting us. We will contact you as soon as possible!'
        }
      } else {
        return {
          success: true,
          status: 'dublicate',
          message: 'Your request exists.'
        }
      }

    }

})