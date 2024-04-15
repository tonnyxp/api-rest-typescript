import User from '../models/users.model';

export class UserService {
  static async getUsers() {
    try {
      const users = await User.findAll();
      return users;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  static async getUser(id: string) {
    try {
      const user = await User.findByPk(id);
      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async updateUser(id: string, body: any) {
    try {
      const user = await User.findByPk(id);
      if (!user) return null;

      await user.update(body);
      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async deleteUser(id: string) {
    try {
      const user = await User.findByPk(id);
      if (!user) return false;

      await user.destroy();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}