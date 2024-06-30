import { Component, OnInit } from '@angular/core';


import {
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
  PushNotifications
} from "@capacitor/push-notifications";
import { ApiService } from './Services/api.service';
import { IDeviceToken } from './shared-models/ProjectModels';
import { AuthService } from './Services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private apiService: ApiService, private authService: AuthService) { }

  ngOnInit() {
    console.log('Initializing HomePage');   
    PushNotifications.requestPermissions().then(result => {
      if (result.receive) {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });


    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
      (token: PushNotificationToken) => {
        const input: IDeviceToken = {
          deviceToken: token.value,
          userId: this.authService.GetAuthenticationData()?.userId
        }
        this.apiService.setDeviceToken(token.value);

        if (input.userId) {
          //update device token
          this.apiService.updateDeviceToken(input).subscribe(t => {
            console.log('Toke saved');

          })
        }
        console.log('Registration token: ', token.value);
      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotification) => {
        
        this.authService.showNotification(notification.title??'', notification.body??'');
        this.apiService.addNotification();
       // alert('Push received: ' + JSON.stringify(notification));
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      }
    );
  }
}
