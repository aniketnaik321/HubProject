import { Component, OnInit } from '@angular/core';


import {
PushNotification,
PushNotificationToken,
PushNotificationActionPerformed,
PushNotifications
} from "@capacitor/push-notifications";


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  ngOnInit() {
    console.log('Initializing HomePage');

 
    PushNotifications.requestPermissions().then( result => {
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
        alert('Push received: ' + JSON.stringify(notification));
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
