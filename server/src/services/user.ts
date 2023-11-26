import UserModel from '../models/user'
import { UserInterface } from '../types/user'

export const findUser = (email: string) => UserModel.findOne({ email })

export const createUser = (user: UserInterface) =>  UserModel.create({ ...user, profileCompleted: 6/16 * 100 })
