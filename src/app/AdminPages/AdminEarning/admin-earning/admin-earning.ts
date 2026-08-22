import { Component, ViewChild } from '@angular/core';
import { AdminEarning as EaringService } from '../../../Service/Admin/AdminEarning/admin-earning';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

import {
  NgApexchartsModule,
  ApexAxisChartSeries,
  ApexChart,
  ApexStroke,
  ApexXAxis,
  ApexGrid,
  ApexTooltip
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  stroke: ApexStroke;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-admin-earning',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  // schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './admin-earning.html',
  styleUrls: ['./admin-earning.css']
})
export class AdminEarning  {
  
// Service
  constructor(private EarningService: EaringService
    ,private cdr:ChangeDetectorRef
  ) {}





  // 1. Data Structure

 chartOptions: ChartOptions = {
    series: [
      {
        name: 'Revenue',
        data: [

        ],
        
      }
      
    ],



    chart: {
      type: 'area',
      height: 350,
      toolbar: {
        show: false
      },
      background: 'transparent'
    },

    stroke: {
      curve: 'smooth',
      width: 3
    },

    xaxis: {
      categories: [
        '1','2','3','4',
        '5','6','7','8',
        '9','10','11','12'
      ]
    },

    grid: {
      borderColor: '#1f1f1f'
    },

    tooltip: {
      theme: 'dark'
    }
  };

// 2 chart 

 UserchartOptions: ChartOptions = {
    series: [
      {
        name: 'Custumer Admission',
        data: [

        ],
        
      }
      
    ],



    chart: {
      type: 'area',
      height: 350,
      toolbar: {
        show: false
      },
      background: 'transparent'
    },

    stroke: {
      curve: 'smooth',
      width: 3
    },

    xaxis: {
      categories: [
        '1','2','3','4',
        '5','6','7','8',
        '9','10','11','12'
      ]
    },

    grid: {
      borderColor: '#1f1f1f'
    },

    tooltip: {
      theme: 'dark'
    }
  };


  ngOnInit() {

    this.EarnigLoad();

  }

Load(){
  this.EarnigLoad();
}


  EarnigLoad()
  {
    this.EarningService.EarningGet().subscribe({
      next: (data: any) => {
        console.log( data);
        
        // Process the data as needed

        this.chartOptions.series[0].data =[data.mouthlyEarnings[0].amount] ;
        this.UserchartOptions.series[0].data = [data.mouthlyEarnings[0].custumerAdmition] ;

        this.cdr.detectChanges()
      },
      error: (err) => console.error('Error loading earning data:', err)
    });
  }


  assets = [
    'Bitcoin',
    'Ethereum',
    'Serum',
    'Kadena',
    'BNB'
  ];

}