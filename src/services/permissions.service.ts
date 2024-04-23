import PermissionModel, {
  PermissionAttributes as Permission,
} from "../models/permissions.model";

export class PermissionService {
  static async getPermissions() {
    try {
      const permissions = await PermissionModel.findAll();
      return permissions;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  static async getPermission(id: string) {
    try {
      const permission = await PermissionModel.findByPk(id);
      return permission;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async createPermission(payload: Permission) {
    try {
      const permission = await PermissionModel.create(payload);
      return permission;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async updatePermission(id: string, payload: Permission) {
    try {
      const permission = await PermissionModel.findByPk(id);
      if (!permission) return null;

      await permission.update(payload);
      return permission;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async deletePermission(id: string) {
    try {
      const permission = await PermissionModel.findByPk(id);
      if (!permission) return false;

      await permission.destroy();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
