import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

 /* constructor(private firebase: Firebase, private platform: Platform) {}

  async getToken() {
    let token;

    if (this.platform.is('android')) {
      token = await this.firebase.getToken();
    }

    if (this.platform.is('ios')) {
      token = await this.firebase.getToken();
      await this.firebase.grantPermission();
    }

    this.saveTokenToServer(token);
  }

  private saveTokenToServer(token: any) {
    // Save the token to your server/database
  }

  onNotifications() {
    return this.firebase.onNotificationOpen();
  }
  */
}
