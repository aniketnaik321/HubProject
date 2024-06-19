import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private route:Router) { }

  ngOnInit() {
  }


  userName: string = 'John Doe';
  defaultProject: string = '1';
  projects = [
    { id: '1', name: 'Project Alpha' },
    { id: '2', name: 'Project Beta' },
    { id: '3', name: 'Project Gamma' }
  ];


 

  editProfile() {
    console.log('Edit project clicked');
    // Implement project editing logic
  }

  editPhoto() {
    console.log('Edit project clicked');
    // Implement project editing logic
  }

  signOut(){
    this.route.navigate(['/login']);
  }

}
