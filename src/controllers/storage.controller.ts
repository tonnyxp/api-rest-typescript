import fs from "node:fs";
import { Request, Response } from "express";
import Storage from "../models/storage.model";
import { StorageService } from "../services/storage.service";
import { handleHttpError } from "../utils/error.handle";

const PUBLIC_URL = process.env.PUBLIC_URL || null;
const PATH_STORAGE = `${process.cwd()}/storage`;

export class StorageController {
  static async upload({ file }: Request, res: Response) {
    try {
      const fileData: Storage = new Storage({
        filename: `${file?.filename}`,
        url: `${PUBLIC_URL}/${file?.filename}`,
      });

      const data = await StorageService.registerUpload(fileData);
      res.status(201).send({ data });
    } catch (e) {
      handleHttpError(res, "No se pudo subir el archivo");
    }
  }

  static async delete({ params }: Request, res: Response) {
    try {
      const { id } = params;
      const file = await StorageService.deleteUpload(id);

      const filePath = `${PATH_STORAGE}/${file?.filename}`;
      fs.unlinkSync(filePath);

      const data = {
        filePath,
        deleted: true,
      };

      res.status(200).send({ data });
    } catch (e) {
      handleHttpError(res, "No se pudo eliminar el archivo");
    }
  }
}
