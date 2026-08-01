import * as UserRepository from './auth.repository';

export const createUser = async (userData: any) => {
    return await UserRepository.createUser(userData)
}

export const findUsers = async (email: string) => {
    return await UserRepository.findUsers(email)
}