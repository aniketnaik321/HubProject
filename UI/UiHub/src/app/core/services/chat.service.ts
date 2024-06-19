import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  
  private baseUrl =  environment.ApiURL;
  private hubUrl =  environment.SignarlRHub;
    private hubConnection: signalR.HubConnection;
  
    constructor() {
      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(this.hubUrl)
        .build();
    }
  
    public startConnection(): void {
      this.hubConnection.start()
        .then(() => console.log('Connection started'))
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


