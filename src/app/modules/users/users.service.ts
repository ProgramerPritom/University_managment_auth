import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { errorlogger } from '../../../shared/logger'
import { IUser } from './users.interface'
import { User } from './users.model'
import { generateUserId } from './users.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  try {
    const id = await generateUserId()
    user.id = id
    if (!user.password) {
      user.password = config.default_user_pass as string
    }
    const createdUser = await User.create(user)
    return createdUser
  } catch (error) {
    errorlogger.error('Error creating user:', error)
    throw new ApiError(400,"Failed to create user",error)
  }
}

export default {
  createUser,
}
