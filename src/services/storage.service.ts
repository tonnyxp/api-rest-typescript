import Storage from "../models/storage.model";

export class StorageService {
  static async registerUpload({ filename, url }: Storage) {
    const upload = await Storage.create({ filename, url });
    return upload;
  }

  static async deleteUpload(id: string) {
    const upload = await Storage.findByPk(id);
    if (!upload) return null;

    await upload.destroy();
    return upload;
  }
}
