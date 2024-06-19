export interface ILoginModel {
    userName:string,
    password:string    
  }
  export interface IUserModel {
    userId: string;
    userName: string;
    fullName: string;
    refreshToken: string | null;
    token: string;
    emailId: string;
    userProfiles: IUserProfile[] | null;
    roles: string[] | null;
  }

  export interface IUserProfile {
    id: number;
    defaultProjectId?: string; 
  }

  export interface IResetPasswordModel {
    token:string,
    newPassword:string,
    confirmPassword:string  
  }


  export interface IChangePasswordModel {
    oldPassword:string,
    newPassword:string,
    confirmPassword:string  
  }

  export interface IResetResetLinkRequest {
   emailId:string 
  }
  