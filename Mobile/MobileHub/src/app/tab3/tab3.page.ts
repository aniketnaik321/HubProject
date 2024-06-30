import { Component, OnInit } from '@angular/core';
import { IProject } from '../shared-models/ProjectModels';
import { IPagedRequest } from '../shared-models/PagedFilterRequest';
import { ApiService } from '../Services/api.service';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  tableData?: IProject[];
  selecteddata?: IProject;
  request?: IPagedRequest;
  dialogDisplay: boolean = false;

  totalRecords: number = 0;
  pageSize: number = 10;
  showDropdown: any;



  constructor(private apiService: ApiService,private authService: AuthService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.loadDataLazy();
  }


  getBadgeColor(completionStatus: number): string {
    if (completionStatus === 0) {
      return 'medium'; // Default grey
    } else if (completionStatus > 0 && completionStatus < 100) {
      return 'primary'; // In-Progress yellow
    } else if (completionStatus === 100) {
      return 'success'; // Completed green
    }
    return 'medium';
  }

  getBadgeText(completionStatus: number): string {
    if (completionStatus === 0) {
      return 'Not Started';
    } else if (completionStatus > 0 && completionStatus < 100) {
      return 'In Progress';
    } else if (completionStatus === 100) {
      return 'Completed';
    }
    return 'Not Started'
  }

  async loadDataLazy() {
    let request: IPagedRequest = {
      pageNumber: 1,
      pageSize: 10,
      filterKeys: "",//event.filters, // Implement this based on your filtering logic
      filterValues: "",
      orderByKey: 'createdOn',
      sortDirection: 1
    };
    if (event) {
      // Update your request parameters based on the LazyLoadEvent
      request = {
        pageNumber: 1,
        pageSize: this.pageSize,
        filterKeys: "",//event.filters, // Implement this based on your filtering logic
        filterValues: "",
        orderByKey: 'createdOn',
        sortDirection: 1
      };
    }
    await this.presentLoading();
    // Call your API service for lazy loading
    this.apiService.getProjectList(request).subscribe((data) => {
      this.tableData = data.data; // Update with the actual property in your API response
      this.totalRecords = data.totalCount; // Update with the actual property in your API response
      this.dismissLoading();
    });
  }


  toggleDropdown(project: IProject) {
    project.showDropdown = !project.showDropdown;
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

  add(){
    this.apiService.addNotification();
  //  this.authService.showNotification("test","<i>test</i>")
  }

}
