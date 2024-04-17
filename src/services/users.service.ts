import { User } from "../interfaces/user.interface";
import UserModel from "../models/users.model";

export class UserService {
  static async getUsers() {
    try {
      const users = await UserModel.findAll();
      return users;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  static async getUser(id: string) {
    try {
      const user = await UserModel.findByPk(id);
      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async updateUser(id: string, payload: User) {
    try {
      const user = await UserModel.findByPk(id);
      if (!user) return null;

      await user.update(payload);
      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async deleteUser(id: string) {
    try {
      const user = await UserModel.findByPk(id);
      if (!user) return false;

      await user.destroy();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
