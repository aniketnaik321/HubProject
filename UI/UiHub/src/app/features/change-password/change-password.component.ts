import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { IChangePasswordModel } from 'src/app/core/shared-models/IAccountModels';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  form: FormGroup;
isDataLoaded:boolean=true;

constructor(private authService: AuthService,
  private router: Router,
  private apiService: ApiService,
  private messageService: MessageService,
  private fb: FormBuilder,
  private route: ActivatedRoute){
  this.form = this.fb.group({
    oldPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
  });
}



changePassword(): void {
  const data: IChangePasswordModel = this.form.value;
  this.isDataLoaded = false;
  if (this.form.valid) {
    // Your form is valid, you can submit the data
    const formData = this.form.value;


    this.apiService.ChangePassword(data).subscribe({
      next: (data) => {
        this.isDataLoaded = true;
        if (data.statusCode === 200) {
          this.messageService.add({ severity: 'success', summary: data.message, detail: '' });
          this.form.reset();
        }
      },
      error: (data: any) => {
        this.isDataLoaded = true;
        this.messageService.add({ severity: 'error', summary: data.error.message, detail: '' });

      }
    });
  }
}

}
