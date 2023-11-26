import '../auth/index'

import { NextFunction, Request, Response } from "express";
import createHttpError, { isHttpError } from "http-errors";
import passport from "passport";
import cors from "cors";
import express from "express";

import { Constants } from "./constants";
import userRoutes from "../routes/user";
import blogRoutes from "../routes/blog";


const app = express();

const server = () => {
    app.use(express.json({ limit: "50mb" }));
    app.use(express.urlencoded( { extended: false} ))
    app.use(express.urlencoded({ limit: "50mb" }));
    app.use(cors({
        origin: 'http://localhost:5173'
    }))
    app.use(passport.initialize())
 
    app.use('/api/user', userRoutes)
    app.use('/api/blogs', blogRoutes)

    app.get("/");
    // no endpoint
    app.use((req, res, next) => {
      next(createHttpError(404, Constants.routeNotFound));
    });
  
    // error handler
    app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
      let errorMessage = "An unknown error occured.";
      let statusCode = 500;
      if (isHttpError(error)) {
        errorMessage = error.message;
        statusCode = error.status;
      }
      res.status(statusCode).json({
        success: false,
        message: error,
      });
    });
    return app; 
};

export default server;
