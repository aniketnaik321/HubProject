import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  @Input() title: string='';
  @Input()  notificationCount:number=0;
  @Input()  messageCount:number=0;

  constructor(private router: Router,private apiService:ApiService) { }

  ngOnInit() {
    this.apiService.getNotificationCount().subscribe(count => {
      this.notificationCount = count;
    });
  }

  goBack() {
    history.back();
  }

  
  onNotificationClick() {
    // Handle notification click
    this.router.navigate(['/notifications']);
  }

  onMessagingClick() {
    // Handle messaging icon click
    console.log('Messaging icon clicked');
  }

  onProfileClick() {
    // Navigate to profile page
    this.router.navigate(['/profile']);
  }

  viewDetails(issue:any){
    console.log('Messaging icon clicked');
  }

}
