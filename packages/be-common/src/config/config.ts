import dotenv from "dotenv";

dotenv.config();

const _config = {
  port: process.env.PORT,

  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY,

  nodeEnv: process.env.NODE_ENV
}

export const config = Object.freeze(_config);