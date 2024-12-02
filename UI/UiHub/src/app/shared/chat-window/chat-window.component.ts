import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ChatService } from 'src/app/core/services/chat.service';
import { IChatMessage, IUserChats } from 'src/app/core/shared-models/ProjectModels';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent {
  messages: IChatMessage[] = [];
  newMessage: string = '';
  selectedUserId: string = '';
  selectedChat?:IUserChats;

  constructor(private chatService: ChatService, private authService: AuthService) { }

  ngOnInit(): void {
    this.chatService.startConnection();
    this.chatService.addChatListener((message: string) => {
      this.messages.push({
        Id: '0',
        message: message,
        senderName: 'Aniket',
        picturePath: ''

      });
    });
  }

  sendMessage(): void {
    if (this.newMessage.trim() !== '') {
      this.chatService.sendMessage(this.authService.GetAuthenticationData()?.userId!, this.newMessage); // Replace 'userId' with the actual user ID
      this.newMessage = '';
    }
  }

  loadSelectedUserChat(): void {

  }

  selectChat(data:any){


  }


}
