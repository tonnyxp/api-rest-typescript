import { Auth } from "../interfaces/auth.interface";
import { User } from "../interfaces/user.interface";
import UserModel from "../models/users.model";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { decodeToken, generateToken } from "../utils/jwt.handle";
import {
  PASSWORD_INCORRECT,
  USER_EXISTS,
  USER_NOT_EXISTS,
} from "../constants/auth";
import { ROLE_TYPES } from "../constants/roles";

export class AuthService {
  static async registerUser({ name, email, password }: User) {
    const checkIt = await UserModel.findOne({ where: { email } });
    if (checkIt) return USER_EXISTS;

    const passwordHash = await encrypt(password);
    const user = await UserModel.create({
      name,
      email,
      password: passwordHash,
      roleId: ROLE_TYPES.USER,
    });

    return user;
  }

  static async loginUser({ email, password }: Auth) {
    const user = await UserModel.findOne({
      where: { email, status: 1 },
      attributes: { include: ["password"] },
      include: { association: "role" },
    });

    if (!user) return USER_NOT_EXISTS;

    const checkPassword = await verified(password, user.password);
    if (!checkPassword) return PASSWORD_INCORRECT;

    const token = generateToken(user);
    return { token };
  }

  static async profileUser(token: string) {
    const { id: userId } = decodeToken(token) as { id: string };

    const user = await UserModel.findOne({
      where: { uuid: userId, status: 1 },
      include: { association: "role" },
    });

    if (!user) return USER_NOT_EXISTS;

    const data = {
      uuid: user.uuid,
      name: user.name,
      email: user.email,
      role: user.role?.name,
    };

    return data;
  }

  static async refreshToken(token: string) {
    const { id: userId } = decodeToken(token) as { id: string };

    const user = await UserModel.findOne({
      where: { uuid: userId, status: 1 },
      include: { association: "role" },
    });

    if (!user) return USER_NOT_EXISTS;

    const newToken = generateToken(user);
    return { token: newToken };
  }
}
