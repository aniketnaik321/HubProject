import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendarOptions } from '@fullcalendar/core';
import { MenuItem, MessageService } from 'primeng/api';
import { TableLazyLoadEvent } from 'primeng/table';
import { ApiService } from 'src/app/core/services/api.service';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list';
import { IPagedRequest } from 'src/app/core/shared-models/PagedFilterRequest';
import { IIssues } from 'src/app/core/shared-models/ProjectModels';
import { AuthService } from 'src/app/core/services/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  tableData?: IIssues[];
  totalRecords: number = 0;
  userName?: string = '';
  calendarOptions: CalendarOptions = {
    initialView: 'listWeek',
    height: "100%",
    timeZone: 'UTC',
    buttonText: {
      today: 'TODAY',
      month: 'MONTH',
      week: 'WEEK',
      day: 'DAY',
      list: 'LIST'
    },
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'listWeek,timeGridDay,timeGridWeek,dayGridMonth'
    },
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin]
  };

  constructor(private apiService: ApiService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private authService: AuthService) {

  }

  ngOnInit(): void {
    this.loadDataLazy();
    this.userName = this.authService.GetAuthenticationData()?.fullName;
  }

  loadDataLazy(event?: TableLazyLoadEvent) {
    let request: IPagedRequest = {
      pageNumber: 1,
      pageSize: 100,
      filterKeys: "",//event.filters, // Implement this based on your filtering logic
      filterValues: "",
      orderByKey: 'createdDate',
      sortDirection: 1
    };
    // Call your API service for lazy loading
    this.apiService.getTaskList(request).subscribe((data) => {
      this.tableData = data.data; // Update with the actual property in your API response
      this.totalRecords = data.totalCount; // Update with the actual property in your API response      
      this.calendarOptions.events = data.data.map(task => ({
        title: task.summary,
        start: task.startDate,
        end: task.dueDate
      }));     
    });
  }
}


