import { Auth } from "./auth.interface";

export interface User extends Auth {
  name: string;
  verified: boolean;
  roleId: number;
  status: number;
}
