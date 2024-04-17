import { Storage } from "../interfaces/storage.interface";
import StorageModel from "../models/storage.model";

export class StorageService {
  static async registerUpload({ filename, url }: Storage) {
    const upload = await StorageModel.create({ filename, url });
    return upload;
  }

  static async deleteUpload(id: string) {
    const upload = await StorageModel.findByPk(id);
    if (!upload) return null;

    await upload.destroy();
    return upload;
  }
}
