import { Injectable } from '@angular/core';
import { IUserModel } from '../shared-models/IAccountModels';
import { DefaultProjectService } from './default-project.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticatedUser() {
    return true;
  }

  isFirstLogin: number = 0;


  constructor(private defaultProjectService: DefaultProjectService) { }

  SaveAuthenticationData(data: IUserModel): void {
    //save authentication data in local storage.

    // Convert the user data to a JSON string
    const jsonData = JSON.stringify(data);
    //this.defaultProjectService.setDefaultProjectId(data.userProfiles![0].defaultProjectId!)
    // Save the JSON string in local storage
    localStorage.setItem('authData', jsonData);
    localStorage.setItem("DefaultProjectId", data.userProfiles![0].defaultProjectId?.toUpperCase()!);
    localStorage.setItem('Token', data.token);

  }

  GetToken(): string | null {
    return localStorage.getItem('Token');

  }

  GetAuthenticationData(): IUserModel | null {
    // Retrieve the JSON string from local storage
    const jsonData = localStorage.getItem('authData');

    if (jsonData) {
      // Parse the JSON string to get the user data
      return JSON.parse(jsonData) as IUserModel;
    }

    return null;
  }

  SetIsLoggedInFirstTime(): void {
    localStorage.setItem('isFirstLogin', "1");


  }

  GetIsLoggedInFirstTime(): boolean {
    if (localStorage.getItem('isFirstLogin')=='1') {
      localStorage.setItem('isFirstLogin', "0");

      return true;
    } else {
      return false;
    }

  }

  SignOutUser() {
    localStorage.clear();
  }

}
