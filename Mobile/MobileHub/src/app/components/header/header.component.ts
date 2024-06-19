import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  @Input() title: string='';
  @Input()  notificationCount:number=5;

  constructor(private router: Router) { }

  ngOnInit() {}

  
  onNotificationClick() {
    // Handle notification click
    console.log('Notification icon clicked');
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
