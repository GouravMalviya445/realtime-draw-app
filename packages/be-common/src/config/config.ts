import dotenv from "dotenv";

dotenv.config();

const _config = {
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiry: process.env.JWT_EXPIRY
}

export const config = Object.freeze(_config);