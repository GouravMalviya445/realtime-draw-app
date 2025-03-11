import { verifyJwtToken } from "@repo/be-common/src/lib";
import { ApiError, requestHandler } from "@repo/be-common/src/utils";
import { NextFunction, Request, Response } from "express";
import { prisma } from "@repo/db/prisma";


declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        name: string;
        email: string;
        password?: string;
        createdAt?: Date;
        updatedAt?: Date;
      }
    }
  }
}

const authMiddleware = requestHandler(async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.header("Authorization")?.replace("Bearer ", "") || req.cookies?.["accessToken"];
  if (!accessToken) {
    throw new ApiError(401, "Unauthorized | token not found");
  }

  try {
    // decode the token 
    const decodedToken = verifyJwtToken(accessToken);

    if (!decodedToken || typeof decodedToken === "string") {
      throw new ApiError(401, "Unauthorized | Invalid token");
    }

    // find the user with the userId you get from the accessToken
    const user = await prisma.user.findUnique({
      where: { id: decodedToken?.id },
      select: {
        id: true,
        password: false,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      }
    });
    if (!user) {
      throw new ApiError(404, "User not found")
    }
    
    // add user to req object req.user = user
    req.user = user;
    next();
  } catch (error: any) {
    throw new ApiError(500, error.message || "Unauthorized | Invalid token", error.errors || [], error.stack || "");
  }
})

export {authMiddleware};