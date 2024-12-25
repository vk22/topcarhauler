import { User } from "~~/server/models/user-model";
import { Quote } from "~~/server/models/quote-model";

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