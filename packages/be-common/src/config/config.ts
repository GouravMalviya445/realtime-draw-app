import dotenv from "dotenv";

dotenv.config();

const _config = {
  port: process.env.PORT,

  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY,

  nodeEnv: process.env.NODE_ENV,
  corsOrigin: process.env.CORS_ORIGIN
}

export const config = Object.freeze(_config);