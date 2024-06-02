import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { DefaultProjectService } from 'src/app/core/services/default-project.service';
import { IUserModel } from 'src/app/core/shared-models/IAccountModels';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {

  userModel!: IUserModel | null;
  projectList: any[] | undefined;

  selectedProject: any | undefined;
  dataTypeIdOptions: any;
  constructor(private authService: AuthService,
    private route: Router,
    private apiService: ApiService,
    private defaultProjectService: DefaultProjectService) {
    this.projectList = [];
  }

  ngOnInit(): void {
    this.userModel = this.authService.GetAuthenticationData();
    this.setupLookup();   
  }

  SignOut(): void {
    this.authService.SignOutUser();
    this.route.navigate(["/login"]);
  }

  setDefaultProject(data: any) {
    if (data.value){
      this.defaultProjectService.setDefaultProjectId(data.value.value);  
      this.defaultProjectService.updateDropdownData(data.value.value) ;  
    }
  }


  setupLookup(): void {
    // Call your API service for lazy loading
    this.apiService.getProjectLookupData().subscribe((data: any) => {
      this.projectList = data[0].map((T: any) => {

        return { name: T.name, value: T.code, description: T.description };
      });
      this.selectedProject = this.projectList?.find(T => T.value === this.defaultProjectService.getDefaultProjectId());
    });
  }

}
