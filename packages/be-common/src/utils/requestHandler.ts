import type { Request, Response, NextFunction } from "express";

function requestHandler(asyncRequest: (req: Request, res: Response, next: NextFunction) => Promise<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(asyncRequest(req, res, next)).catch(err => next(err));
  }
}

export { requestHandler };