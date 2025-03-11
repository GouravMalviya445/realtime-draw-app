import jwt from "jsonwebtoken"
import { config } from "../config/config";

export function verifyJwtToken(token: string) {
  if (!token) return null;
  try {
    if (!config.accessTokenSecret) {
      throw new Error("Secret not defined");
    }
    
    return jwt.verify(token, config.accessTokenSecret);
  } catch (err) {
    console.log("Error while verifying token");
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
    console.log("Error while creating jwt token");    
  }
}