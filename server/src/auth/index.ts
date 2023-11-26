import passport from 'passport'
import { Strategy as JWTStrategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { Types } from 'mongoose';

import env from '../config/validateEnv'
import UserModel from '../models/user';
import logger from "../config/logger";

type JWTToken = { 
    userId: Types.ObjectId
}

const options = {
    secretOrKey: env.JWT_SECRET_KEY,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}

export default passport.use(new JWTStrategy(options, async(token: JWTToken, done: VerifiedCallback) => {
    try {

         const user = await UserModel.findById(token.userId)

        if (user) return done(null, token.userId) 
        else return done(null, false)

    } catch (error) {
        if(error instanceof Error) {
            logger.error(error.message)
            return done(error, false)
        }
    }
}))

