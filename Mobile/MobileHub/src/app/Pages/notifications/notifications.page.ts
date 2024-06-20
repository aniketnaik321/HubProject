import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/Services/api.service';
import { IPagedData } from 'src/app/shared-models/IPagedData';
import { IPagedRequest } from 'src/app/shared-models/PagedFilterRequest';
import { INotificationResponse } from 'src/app/shared-models/ProjectModels';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  notifications: INotificationResponse[] = [];
  pageNumber = 1;
  pageSize = 10;
  isLoaded:boolean=true;

  constructor(private apiService: ApiService,private loadingCtrl: LoadingController ) { }

  ngOnInit() {
    this.loadNotifications();   
  }

  async loadNotifications(event?: any) {
    const request: IPagedRequest = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      filterKeys: "",
      filterValues: "",
      orderByKey: "Id",
      sortDirection: 1
    };

    if(!this.isLoaded)return;
    await this.presentLoading();
    this.apiService.getNotifications(request).subscribe(
      (response: IPagedData<INotificationResponse>) => {
        this.notifications = [...this.notifications, ...response.data];
        if (event) {
          event.target.complete();
        }
        this.isLoaded=true;
        this.apiService.resetNotification();
        this.dismissLoading();
      },
      error => {
        console.error(error);
        if (event) {
          event.target.complete();
        }
        this.isLoaded=true;
        this.dismissLoading();
      }
    );
  }

  loadData(event: any) {
    if(!this.isLoaded) return;
    this.pageNumber++;
    this.loadNotifications(event);
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
