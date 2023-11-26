import "dotenv/config"
import "./auth/index"

import dotenv from 'dotenv';
import mongoose from 'mongoose';

import env from './config/validateEnv';
import logger from './config/logger'
import server from "./utility/server";

const app = server();

dotenv.config();

mongoose
.connect(env.MONGO_CONNECTION_STRING)
.then(() => {
  logger.info("Mongoose connected");
})
.catch(logger.error)

// Listen to server
const port = 3000;
app.listen(port, () => console.log(`Server Up and running at http://localhost:${port}`));


