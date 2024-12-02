import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private baseUrl = environment.ApiURL;
  private hubUrl = environment.NotificationServiceHub;
  private hubConnection: signalR.HubConnection;

  constructor() {
    // this.hubConnection = new signalR.HubConnectionBuilder()
    //   .withUrl(this.hubUrl)
    //   .build();

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.hubUrl)
      .build();

    // this.hubConnection.on("ReceiveMessage", function (message) {
    //   console.log("New message: " + message);
    //   // Show the message in the UI or handle it appropriately
    // });

    // this.hubConnection.start().catch(function (err) {
    //   return console.error(err.toString());
    // });

  }

  public startConnection(userId: string): void {
    this.hubConnection.start()
      .then(() => {
        console.log('Connection started');
        this.hubConnection.invoke('RegisterUserConnection', userId, this.hubConnection.connectionId)
          .catch(err => console.error('Error while registering user connection: ' + err));
      })
      .catch(err => console.log('Error while starting connection: ' + err));
  }

  public addChatListener(callback: (message: string) => void): void {
    this.hubConnection.on('ReceiveMessage', callback);
  }

  public sendMessage(userId: string, message: string): void {
    this.hubConnection.invoke('SendMessageToUser', userId, message)
      .catch(err => console.error(err));
  }
}
