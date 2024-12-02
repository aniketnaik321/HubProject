import { Component } from '@angular/core';


import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexStroke,  
  ApexDataLabels
} from 'ng-apexcharts';


@Component({
  selector: 'app-cattle-dashboard',
  templateUrl: './cattle-dashboard.component.html',
  styleUrl: './cattle-dashboard.component.scss'
})
export class CattleDashboardComponent {

  totalCattles?: number;
  milkingCattles?: number;
  dryCattles?: number;
  avgMilkPerCow?: number;


  // Monthly Sales Data for Table
  monthlySalesData!: any[];

  
  // ApexCharts Data
  monthlySalesSeries!: ApexAxisChartSeries;
  monthlySalesChartOptions!: {
    chart: ApexChart;
    xaxis: ApexXAxis;
    // yaxis: ApexYAxis;
    dataLabels: ApexDataLabels;
    title: ApexTitleSubtitle;
  };


  milkProductionData!: any[];
  milkProductionSeries!: ApexAxisChartSeries;
  chartOptions!: {
    chart: ApexChart;
    xaxis: ApexXAxis;
    stroke: ApexStroke;
    dataLabels: ApexDataLabels;
    title: ApexTitleSubtitle;
  };


 // Data for Sick Cows
 sickCowsData!: any[];


  constructor() {}

  ngOnInit(): void {
    // Replace with actual data fetching logic
    this.totalCattles = 150;
    this.milkingCattles = 80;
    this.dryCattles = 70;
    this.avgMilkPerCow = 12.5;  // e.g., in kg


    this.milkProductionData = [
      { date: '2024-10-07', cowId: 'C001', nickname: 'Bessie', milkProduced: 15 },
      { date: '2024-10-08', cowId: 'C002', nickname: 'Daisy', milkProduced: 13 },
      { date: '2024-10-09', cowId: 'C003', nickname: 'Bella', milkProduced: 12 },
      { date: '2024-10-10', cowId: 'C004', nickname: 'Luna', milkProduced: 14 },
      { date: '2024-10-11', cowId: 'C005', nickname: 'Rosie', milkProduced: 16 }
    ];

    // ApexCharts Data and Configuration
    this.milkProductionSeries = [
      {
        name: "Milk Production (kg)",
        data: this.milkProductionData.map(data => data.milkProduced)
      }
    ];

    this.chartOptions = {
      chart: {
        type: 'line',
        height: 350
      },
      xaxis: {
        categories: this.milkProductionData.map(data => data.date)
      },
      stroke: {
        curve: 'smooth'
      },
      dataLabels: {
        enabled: false
      },
      title: {
        text: 'Milk Production Over Last 5 Days',
        align: 'left'
      }
    };




 // Monthly Sales Data for the Table
 this.monthlySalesData = [
  { month: 'June', sales: 12, revenue: 6000 },
  { month: 'July', sales: 15, revenue: 7500 },
  { month: 'August', sales: 10, revenue: 5000 },
  { month: 'September', sales: 18, revenue: 9000 },
  { month: 'October', sales: 20, revenue: 10000 }
];

// ApexCharts Data for the Chart
this.monthlySalesSeries = [
  {
    name: 'Cattle Sold',
    data: this.monthlySalesData.map(data => data.sales)
  },
  {
    name: 'Revenue (₹)',
    data: this.monthlySalesData.map(data => data.revenue)
  }
];

this.monthlySalesChartOptions = {
  chart: {
    type: 'bar',
    height: 350
  },
  xaxis: {
    categories: this.monthlySalesData.map(data => data.month)
  },

  dataLabels: {
    enabled: false
  },
  title: {
    text: 'Monthly Sales Overview',
    align: 'left'
  }
};


 // Sample Data for Sick Cows
 this.sickCowsData = [
  { cowId: 'C001', nickname: 'Bessie', status: 'Healthy' },
  { cowId: 'C002', nickname: 'Daisy', status: 'Sick' },
  { cowId: 'C003', nickname: 'Bella', status: 'Healthy' },
  { cowId: 'C004', nickname: 'Luna', status: 'Sick' },
  { cowId: 'C005', nickname: 'Rosie', status: 'Healthy' }
];

}





  }





  





