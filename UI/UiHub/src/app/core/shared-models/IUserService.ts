import { IUserRoles } from "./ProjectModels";

export interface IUserService {
    userId?: number;
    fullName?: string;
    name?: string;
    emailId?: string;
    Roles?:IUserRoles[];
    RoleList?:string[];
  }
  