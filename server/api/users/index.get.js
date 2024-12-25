import { User } from "~~/server/models/user-model";

export default defineEventHandler( async (event) => {
    const users = await User.find().sort({ _id: -1 });
    return {
      users: users
    }

})