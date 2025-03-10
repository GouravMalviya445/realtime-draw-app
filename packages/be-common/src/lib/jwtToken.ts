import jwt from "jsonwebtoken"
import { config } from "../config/config";

export function verifyJwtToken(token: string, secret: string) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    throw new Error("Error while verifying token");
  }
}

export function createJwtToken(payload: object) {
  try {
    if (!config.accessTokenSecret || !config.accessTokenExpiry) {
      throw new Error("Secret or expiry not defined");
    }

    return jwt.sign(
      payload, // jwt payload
      config.accessTokenSecret, // jwt secret 
      { expiresIn: config.accessTokenExpiry } as jwt.SignOptions // jwt options
    )
  } catch (err) {
    throw new Error("Error while creating jwt token");    
  }
}