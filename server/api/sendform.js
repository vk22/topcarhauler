import { User } from "~~/server/models/user-model";
import { Quote } from "~~/server/models/quote-model";
import nodemailer from 'nodemailer';
import { emailTransport, emailFrom, emailTo } from '~~/server/config/config';
const uploadDir = '/var/www/vrv/www/public/cv/'

const sendEmail = (data) => {
  const transporter = nodemailer.createTransport(emailTransport);
  const html = `<p>Name: ${data.name}</p> 
                <p>Email: ${data.email}</p> 
                <p>Phone: ${data.phone}</p>
                <p>Message: ${data.message}</p>`;
  const message = {
    from: emailFrom,
    to: emailTo,
    subject: 'New Request',
    text: '',
    html: html,
  };

  // if (data.filename) {
  //   message.attachments = [
  //     {
  //       filename: data.filename,
  //       path: `${uploadDir}${data.filename}`,
  //     },
  //   ]
  // }
  console.log('message ', message)
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