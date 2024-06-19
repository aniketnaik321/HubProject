import { Component, OnInit, ViewChild } from '@angular/core';
import { IPagedRequest } from '../shared-models/PagedFilterRequest';
import { ApiService } from '../Services/api.service';
import { IPagedData } from '../shared-models/IPagedData';
import { IIssues, IProject } from '../shared-models/ProjectModels';
import { IonContent } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  tableData?: IIssues[];
  selecteddata?: IProject;
  request?: IPagedRequest;
  dialogDisplay: boolean = false;
  @ViewChild(IonContent, { static: true }) content!: IonContent;
  totalRecords: number = 0;
  pageSize: number = 10;

  categorizedIssues: { [key: string]: any[] } = {
    'To Do': [],
    'In Progress': [],
    'Done': []
  };

  summaryCounts = {
    toDo: 0,
    inProgress: 0,
    done: 0
  };
  

  constructor(  private apiService: ApiService,
    private loadingCtrl: LoadingController,   
    private router: Router
    ) {}

  ngOnInit() {

    this.loadDataLazy();
  }

  async loadDataLazy(event?: any) {
    let request: IPagedRequest = {
      pageNumber: 1,
      pageSize: 100,
      filterKeys: "",//event.filters, // Implement this based on your filtering logic
      filterValues: "",
      orderByKey: 'createdDate',
      sortDirection: 1
    };
    await this.presentLoading();
    // Call your API service for lazy loading
    this.apiService.getTaskList(request).subscribe((data) => {
      this.tableData = data.data; // Update with the actual property in your API response
      this.totalRecords = data.totalCount; // Update with the actual property in your API response      
      this.categorizeIssues();
      this.calculateSummaryCounts();
       this.dismissLoading();
       
    });
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'please wait...',
      duration: 3000,
    });

    loading.present();
  }

  categorizeIssues() {
    this.tableData?.forEach(issue => {
      if (issue.statusId === 1) {
        this.categorizedIssues['To Do'].push(issue);
      } else if (issue.statusId === 2) {
        this.categorizedIssues['In Progress'].push(issue);
      } else if (issue.statusId === 3) {
        this.categorizedIssues['Done'].push(issue);
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
  calculateSummaryCounts() {
    this.summaryCounts.toDo = this.categorizedIssues['To Do'].length;
    this.summaryCounts.inProgress = this.categorizedIssues['In Progress'].length;
    this.summaryCounts.done = this.categorizedIssues['Done'].length;
  }

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

  scrollToCategory(category: string) {
    const yOffset = document.getElementById(category)?.offsetTop;
    if (yOffset) {
      this.content.scrollToPoint(0, yOffset, 1000);
    }
  }
}
