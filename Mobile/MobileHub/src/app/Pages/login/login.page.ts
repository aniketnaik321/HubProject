import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/Services/api.service';
import { AuthService } from 'src/app/Services/auth.service';
import { ILoginModel } from 'src/app/shared-models/IAccountModels';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isDataLoaded: boolean = false;

  ngOnInit() {
  }

  email!: string;
  password!: string;
  rememberMe: boolean = false;

  constructor(private router: Router,
    private apiService: ApiService,
    private loadingCtrl: LoadingController,
    private authService: AuthService) { }

  onLogin() {
    // Handle login logic here
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    console.log('Remember Me:', this.rememberMe);

    // For demonstration, navigate to home page after login
    this.router.navigate(['/tabs']);
  }

  async signIn() {
    const data: ILoginModel = {
      password: this.password,
      userName: this.email,

    };
    this.isDataLoaded = false;

    await this.presentLoading();
    // Your form is valid, you can submit the data

    this.apiService.Login(data).subscribe({
      next: (data) => {
        this.isDataLoaded = true;
        if (data.statusCode === 200) {
          this.authService.SaveAuthenticationData(data.data)
          this.router.navigate(['/tabs']);
        } else {
          alert("Invalid username or password");
        }
        this.dismissLoading();
      },
      error: (data: any) => {
         this.dismissLoading();
        this.isDataLoaded = true;
        // this.messageService.add({ severity: 'error', summary: data.message, detail: '' });
      }

    });
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'lines'
    });
    await loading.present();
  }

  async dismissLoading() {
    await this.loadingCtrl.dismiss();
  }


}


// onForgotPassword() {
//   // Handle forgot password logic here
//   console.log('Forgot password clicked');
// }


