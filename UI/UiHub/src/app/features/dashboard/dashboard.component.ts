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
import { ApexChart, ApexLegend, ApexNonAxisChartSeries, ApexResponsive } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  plotOptions:any;
  legend: ApexLegend;
  tooltip:any
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  myEfficiency:number=34;
  public chartOptions: Partial<ChartOptions>;
  tableData?: IIssues[];
  totalRecords: number = 0;
  userName?: string = '';
  welcomeDialog:boolean=false;
  
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

      this.chartOptions = {
        series: [44, 55, 41, 17, 15], // Data for the donut chart
        chart: {
          type: 'donut', // Chart type
          width: 220  // Optional width, adjust as needed
        },
        labels: ['To Do', 'In-Progress', 'Completed', 'Published'], // Labels for the sections
        legend:{
        show:false
        },

        tooltip: {
          enabled: true,
          style: {
            fontSize: '14px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 'bold',
            color: '#FFFFFF' // Set tooltip text color to white
          },
          theme: 'dark', // Optional: Use dark theme for better contrast with white text
        },

        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                total: {
                  show: true,
                  label: 'Total',
                  formatter: () => '172' // Customize the total label
                }
              }
            }
          },
        dataLabels: {
          enabled: true,
          formatter: function (val: number) {
            return val.toFixed(1) + '%'; // Format labels inside donut
          },
        },      
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                show: false
              }
            }
          }
        ]
      
      }
    }
  }
    
  ngOnInit(): void {
    this.loadDataLazy();
    this.userName = this.authService.GetAuthenticationData()?.fullName;
   if(this.authService.GetIsLoggedInFirstTime()){
      this.welcomeDialog=true;
      
    }   
  }

  loadDataLazy(event?: TableLazyLoadEvent) {
    let request: IPagedRequest = {
      pageNumber: 1,
      pageSize: 1000,
      filterKeys: "statusId",//event.filters, // Implement this based on your filtering logic
      filterValues: "1,2",
      orderByKey: 'createdDate',
      sortDirection: 1
    };
    // Call your API service for lazy loading
    this.apiService.getUserTaskList(request).subscribe((data) => {
      this.tableData = data.data; // Update with the actual property in your API response
      this.totalRecords = data.totalCount; // Update with the actual property in your API response      
      this.calendarOptions.events = data.data.map(task => ({
        title: task.summary,
        start: task.startDate,
        end: task.dueDate
      }));     
    });
  }

  closeWelcomBox(){
    this.welcomeDialog=false;
  }

}



