import { RequestHandler } from "express"
import bcrypt from 'bcrypt'
import createHttpError from 'http-errors'
import jwt from 'jsonwebtoken'
import { StatusCodes } from "http-status-codes"

import env from '../config/validateEnv'
import logger from "../config/logger"
import { UserInterface } from "../types/user"
import { Constants } from "../utility/constants"
import { findUser, createUser } from "../services/user"


export const login: RequestHandler<unknown, unknown, UserInterface, unknown> = async (req, res, next) => {
   
    const { email, password } = req?.body

   try {
        const user = await findUser(email)
        
        if(!user)
            throw createHttpError(StatusCodes.NOT_FOUND, Constants.userNotFound)

        const verifyCredentials = await bcrypt.compare(password, user.password)

        if (!verifyCredentials)
            throw createHttpError(StatusCodes.BAD_REQUEST, Constants.invalidCredentials)

        const token = jwt.sign({ userId: user._id }, env.JWT_SECRET_KEY)

        res.status(StatusCodes.OK).json({
            success: true,
            data: { user, token },
            message: Constants.userLoggedInSuccessfully
        })
        
    } catch(error) {
        logger.error(error)
        next(error)
    }

}


export const register: RequestHandler = async (req, res, next) => {
    try {
        const { email, password, name } = req?.body
        const clubs = ["Spartans", "Vikings", "Avengers", "Ninjas"]

        const existingUser = await findUser(email)
        
        if(existingUser)
            throw createHttpError(StatusCodes.BAD_REQUEST, Constants.userExists)

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await createUser({ email, password: hashedPassword, name })

        res.status(StatusCodes.OK).json({
            success: true,
            data: newUser,
            message: Constants.userRegisteredSuccessfully
        })

    } catch(error){
        logger.error(error)
        next(error)
    }
}