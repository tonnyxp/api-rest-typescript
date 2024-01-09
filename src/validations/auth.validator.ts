import { NextFunction, Request, Response } from "express";
import { check } from "express-validator";
import { validateResult } from "../utils/validator.handle";

const validateRegister = [
  check("name", "El nombre es requerido").notEmpty(),
  check("email", "El correo es requerido").isEmail(),
  check("password", "La contraseña es requerida").notEmpty(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];

const validateLogin = [
  check("email", "El correo es requerido").isEmail(),
  check("password", "La contraseña es requerida").notEmpty(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];

export { validateRegister, validateLogin };
