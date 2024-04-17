import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { handleErrorResponse, handleHttpError } from "../utils/error.handle";
import {
  PASSWORD_INCORRECT,
  USER_EXISTS,
  USER_NOT_EXISTS,
} from "../constants/auth";

export class AuthController {
  static async register({ body }: Request, res: Response) {
    try {
      const data = await AuthService.registerUser(body);

      if (data === USER_EXISTS) {
        return handleErrorResponse(res, "El usuario ya existe", 500);
      }

      res.status(201).send({ data });
    } catch (e) {
      handleHttpError(res, "No se pudo registrar al usuario");
    }
  }

  static async login({ body }: Request, res: Response) {
    try {
      const data = await AuthService.loginUser(body);

      if (data === USER_NOT_EXISTS) {
        return handleErrorResponse(res, "Usuario no encontrado", 404);
      } else if (data === PASSWORD_INCORRECT) {
        return handleErrorResponse(res, "Contraseña incorrecta", 403);
      }

      res.status(200).send({ data });
    } catch (e) {
      handleHttpError(res, "Credenciales incorrectas");
    }
  }

  static async profile(req: Request, res: Response) {
    try {
      if (!req.headers.authorization)
        return handleHttpError(res, "No autorizado");

      const token = req.headers.authorization.split(" ").pop() as string;
      const data = await AuthService.profileUser(token);

      if (data === USER_NOT_EXISTS) {
        return handleErrorResponse(res, "Usuario no encontrado", 404);
      }

      res.status(200).send({ data });
    } catch (e) {
      console.error(e);
      handleHttpError(res, "No se pudo obtener el perfil del usuario");
    }
  }

  static async refreshToken(req: Request, res: Response) {
    try {
      if (!req.headers.authorization)
        return handleHttpError(res, "No autorizado");

      const token = req.headers.authorization.split(" ").pop() as string;
      const data = await AuthService.refreshToken(token);

      res.status(200).send({ data });
    } catch (e) {
      console.error(e);
      handleHttpError(res, "No se pudo refrescar el token");
    }
  }
}
