import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "@repo/be-common/src/config/config";
import { ApiResponse, ApiError, requestHandler } from "@repo/be-common/src/utils";
import { NextFunction, Request, Response } from "express";


const authMiddleware = requestHandler(async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "") || req.cookies["accessToken"];
  if (!token) {
    throw new ApiError(401, "Unauthorized / token not found");
  }

  if (!config.accessTokenSecret) {
    throw new ApiError(500, "Access token secret not found");
  }

  try {
    // decode the token 
    const accessToken = jwt.verify(token, config.accessTokenSecret);

    if (typeof accessToken === "string") {
      throw new ApiError(401, "Unauthorized / invalid token");
    }

    // TODO: find the user with the userId you get from the accessToken
    // TODO: add user to req object req.user = user
    next();
  } catch (error) {
    throw new ApiError(401, "Unauthorized / invalid token");
  }
})

export {authMiddleware};