import { decode, sign, verify } from "jsonwebtoken";
import { User } from "../interfaces/user.interface";

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN as string;

/**
 * Generate token with payload
 * @param payload
 * @returns
 */
const generateToken = (payload: User) => {
  const token = sign(
    {
      id: payload.uuid,
      role: payload.role?.name,
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES_IN,
    }
  );
  return token;
};

/**
 * Verify token with secret
 * @param token
 * @returns
 */
const verifyToken = (token: string) => {
  try {
    const decoded = verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};

const decodeToken = (token: string) => {
  const payload = decode(token);
  return payload;
};

export { generateToken, verifyToken, decodeToken };
