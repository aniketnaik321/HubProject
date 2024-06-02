import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  ngOnInit() {
  }

  email!: string;
  password!: string;
  rememberMe: boolean = false;

  constructor(private router: Router) {}

  onLogin() {
    // Handle login logic here
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    console.log('Remember Me:', this.rememberMe);

    // For demonstration, navigate to home page after login
    this.router.navigate(['/tabs']);
  }

  onForgotPassword() {
    // Handle forgot password logic here
    console.log('Forgot password clicked');
  }

}
