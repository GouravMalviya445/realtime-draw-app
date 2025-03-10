import jwt from "jsonwebtoken"

export function verifyJwtToken(token: string, secret: string) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    throw new Error("Error while verifying token");
  }
}