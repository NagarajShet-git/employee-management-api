import { User } from "./auth.model"

export const createUser = async (userData: any) => {
    return await User.create(userData)
}

export const findUsers = async (email: string) => {
    return await User.find({ email })
}
