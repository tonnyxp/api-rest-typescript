import bcrypt from "bcryptjs";

/**
 * Encrypt textplain
 * @param {*} textPlain
 * @returns
 */
const encrypt = async (textPlain: string) => {
  return await bcrypt.hash(textPlain, 8);
};

/**
 * Verified password with hash
 * @param {*} passwordPlain
 * @param {*} passwordHash
 * @returns
 */
const verified = async (passwordPlain: string, passwordHash: string) => {
  return await bcrypt.compare(passwordPlain, passwordHash);
};

export { encrypt, verified };
