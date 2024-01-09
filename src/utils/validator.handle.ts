import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

/**
 * Validate the result of the validation
 * @param req
 * @param res
 * @param next
 * @returns
 */
const validateResult = (req: Request, res: Response, next: NextFunction) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (err: any) {
    res.status(403).send({ error: err.array() });
  }
};

export { validateResult };
