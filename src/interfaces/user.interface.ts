import { Auth } from "./auth.interface";
import { Role } from "./role.interface";

export interface User extends Auth {
  uuid: string;
  name: string;
  verified: boolean;
  roleId: number;
  status: number;
  role?: Role;
}
