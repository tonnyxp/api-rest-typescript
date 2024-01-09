import { sequelize } from "../config/mysql";
import User from "../models/users.model";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { decodeToken, generateToken } from "../utils/jwt.handle";
import {
  PASSWORD_INCORRECT,
  USER_EXISTS,
  USER_NOT_EXISTS,
} from "../constants/auth";

export class AuthService {
  static async registerUser({ name, email, password }: User) {
    const transaction = await sequelize.transaction();

    try {
      const checkIt = await User.findOne({ where: { email } });
      if (checkIt) return USER_EXISTS;

      const passwordHash = await encrypt(password);
      const user = await User.create(
        { name, email, password: passwordHash },
        { transaction }
      );

      await transaction.commit();
      return user;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async loginUser({ email, password }: User) {
    const user = await User.findOne({ where: { email, active: true } });
    if (!user) return USER_NOT_EXISTS;

    const checkPassword = await verified(password, user.password);
    if (!checkPassword) return PASSWORD_INCORRECT;

    const token = generateToken(user);
    return { token };
  }

  static async profileUser(token: string) {
    const { id: userId } = decodeToken(token) as { id: string };

    const user = await User.findOne({ where: { uuid: userId } });
    if (!user) return USER_NOT_EXISTS;

    const data = {
      uuid: user.uuid,
      name: user.name,
      email: user.email,
    };

    return data;
  }

  static async refreshToken(token: string) {
    const { id: userId } = decodeToken(token) as { id: string };

    const user = await User.findOne({ where: { uuid: userId } });
    if (!user) return USER_NOT_EXISTS;

    const newToken = generateToken(user);
    return { token: newToken };
  }
}
