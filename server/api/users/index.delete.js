import { User } from "~~/server/models/user-model";

export default defineEventHandler( async (event) => {
    const body = await readBody(event)
    console.log('delete ', body)
    const deleted = await User.deleteOne({ _id: body._id })
    if (!deleted) return false
    return {
      success: true,
      message: 'User deleted successfully'
    }

})