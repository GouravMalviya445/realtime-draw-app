import { config } from "@repo/be-common/src/config/config";
import { ApiError } from "@repo/be-common/src/utils";
import { NextFunction, Request, Response } from "express";


function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  let error = err;
  if (!(err instanceof ApiError)) {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong";
    error = new ApiError(statusCode, message, error.errors || [], error.stack || "")
  }

  const response: ApiError = {
    ...error,
    message: error.message,
  }

  res
    .status(error.statusCode)
    .json(response);
    
  return;
}

export default errorHandler;