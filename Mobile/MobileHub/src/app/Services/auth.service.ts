import { Injectable } from '@angular/core';
import { IUserModel } from '../shared-models/IAccountModels';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticatedUser() {
    return true;
  }

  constructor(
    private toastController: ToastController
    //private defaultProjectService : DefaultProjectService
   
  ) {
  }

  SaveAuthenticationData(data: IUserModel): void {
    //save authentication data in local storage.

    // Convert the user data to a JSON string
    const jsonData = JSON.stringify(data);
    //this.defaultProjectService.setDefaultProjectId(data.userProfiles![0].defaultProjectId!)
    // Save the JSON string in local storage
    localStorage.setItem('authData', jsonData);
    // localStorage.setItem("DefaultProjectId", data.userProfiles![0].defaultProjectId?.toUpperCase()!);
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

  SignOutUser() {

    localStorage.clear();

  }

  public toastButtons = [
    {
      text: 'Dismiss',
      role: 'cancel',
    },
  ];

  async showNotification(title: string, description: string) {
    const toast = await this.toastController.create({
      message: `
        <ion-icon name="notifications-outline"></ion-icon>
        <strong>${title}</strong><br>
        <small>${description}</small>
      `,
      duration: 8000,
      position: 'top',
      cssClass: 'custom-toast',
      buttons:this.toastButtons
    });
    toast.present();
  }

}
