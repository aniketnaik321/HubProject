import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ILoginModel, IResetPasswordModel, IResetResetLinkRequest } from 'src/app/core/shared-models/IAccountModels';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private isAuthenticated = false;
  loginForm: FormGroup;
  message: string = '';
  resetPasswordForm: FormGroup;
  forgotPasswordForm: FormGroup;
  requestComplete: boolean = false;
  resetpasswordtoken: string = '';
  formType: number = 0;
  isDataLoaded: boolean = true;
  constructor(private authService: AuthService,
    private router: Router,
    private apiService: ApiService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.resetPasswordForm = this.fb.group({
      token: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.forgotPasswordForm = this.fb.group({
      emailId: ['', [Validators.email, Validators.required]]
    });

  }

  ngOnInit(): void {
    // Subscribe to the route parameter to get the id
    this.route.paramMap.subscribe((params) => {
      const token=params.get('token');
      if (token) {
        if(token=='2') {this.formType=2; return;}
        this.formType = 1;
        this.resetPasswordForm.patchValue({ 'token': token });
      }
    });
  }

  username: string = '';
  password: string = '';

  signIn(): void {
    const data: ILoginModel = this.loginForm.value;
    this.isDataLoaded = false;
          
    if (this.loginForm.valid) {
      // Your form is valid, you can submit the data
      const formData = this.resetPasswordForm.value;
      this.apiService.Login(data).subscribe({
        next: (data) => {
          this.isDataLoaded = true;
          if (data.statusCode === 200) {
           
            this.messageService.add({ severity: 'success', summary: '', detail: data.message });
            this.formType = 0;
            this.authService.SetIsLoggedInFirstTime();
            this.authService.SaveAuthenticationData(data.data)
            this.router.navigate(['hrlite/ctdashboard']);
          } else {
            this.messageService.add({ severity: 'error', summary: '', detail: data.message });
          }
        },
        error: (data: any) => {
          this.isDataLoaded = true;
          this.messageService.add({ severity: 'error', summary: data.message, detail: '' });
        }

      });
    }
  }


  resetPassword(): void {
    const data: IResetPasswordModel = this.resetPasswordForm.value;
    this.isDataLoaded = false;
    if (this.resetPasswordForm.valid) {
      // Your form is valid, you can submit the data
      const formData = this.resetPasswordForm.value;
      this.apiService.ResetPassword(data).subscribe({
        next: (data) => {
          this.isDataLoaded = true;
          if (data.statusCode === 200) {
            this.messageService.add({ severity: 'success', summary: data.message, detail: '' });
            this.requestComplete = true;
          }
        },
        error: (data: any) => {
          this.isDataLoaded = true;
          this.messageService.add({ severity: 'error', summary: data.error.message, detail: '' });
        }
      });
    }
  }


  sendResetLink(): void {
    const data: IResetResetLinkRequest = this.forgotPasswordForm.value;
    this.isDataLoaded=false;
    if (this.forgotPasswordForm.valid) {
      // Your form is valid, you can submit the data     
      this.apiService.SendResetLink(data).subscribe({
        next: (data) => {
          this.isDataLoaded=true;
          if (data.statusCode === 200) {
            this.messageService.add({ severity: 'success', summary: data.message, detail: '' });
            this.requestComplete = true;
          }
        },
        error: (data: any) => {
          this.isDataLoaded=true;
          this.messageService.add({ severity: 'error', summary: data.error.message, detail: '' });
        }
      });
    }
  }


  logout(): void {
    this.isAuthenticated = false;
  }

  showForgetPasswordForm() {
    this.formType = 2;
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
}
