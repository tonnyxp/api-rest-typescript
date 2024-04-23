import { Request, Response } from "express";
import { handleErrorResponse, handleHttpError } from "../utils/error.handle";
import { PermissionService } from "../services/permissions.service";

export class PermissionController {
  static async findAll(req: Request, res: Response) {
    try {
      const data = await PermissionService.getPermissions();
      res.status(200).send({ data });
    } catch (e) {
      handleHttpError(res, "Error al obtener la lista de permisos");
    }
  }

  static async findOne({ params }: Request, res: Response) {
    try {
      const { id } = params;
      const data = await PermissionService.getPermission(id);
      if (!data) return handleErrorResponse(res, "Permiso no encontrado", 404);

      return res.status(200).send({ data });
    } catch (e) {
      handleHttpError(res, "Error al obtener el permiso");
    }
  }

  static async create({ body }: Request, res: Response) {
    try {
      const data = await PermissionService.createPermission(body);
      res.status(201).send({ data });
    } catch (e) {
      handleHttpError(res, "Error al crear el permiso");
    }
  }

  static async update({ params, body }: Request, res: Response) {
    try {
      const { id } = params;
      const data = await PermissionService.updatePermission(id, body);
      if (!data) return handleErrorResponse(res, "Permiso no encontrado", 404);

      res.status(200).send({ data });
    } catch (e) {
      handleHttpError(res, "Error al actualizar el permiso");
    }
  }

  static async remove({ params }: Request, res: Response) {
    try {
      const { id } = params;
      const data = await PermissionService.deletePermission(id);
      if (!data) return handleErrorResponse(res, "Permiso no encontrado", 404);

      res.status(200).send({ data });
    } catch (e) {
      handleHttpError(res, "Error al eliminar el permiso");
    }
  }
}
