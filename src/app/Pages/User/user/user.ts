import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Authservice } from '../../../Service/AuthService/authservice';

import { Rewardformality } from '../../../Service/Admin/AdminReward/RewardFormality/rewardformality';
import {  ViewChild } from '@angular/core';
import { AdminEarning as EaringService } from '../../../Service/Admin/AdminEarning/admin-earning';
import { CommonModule } from '@angular/common';
import { RewardGet } from '../../../Models/Reward/Reward';
import { AdminReward } from '../../../Service/Admin/AdminReward/admin-reward';
import { ChangeDetectorRef } from '@angular/core';
import { OnInit } from '@angular/core';


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
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule , CommonModule, NgApexchartsModule],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User implements OnInit {
  
  UserName: string | null = '';
  rewardget:RewardGet[]=[];
  AddressStatus:boolean = false;
  RewardId : number =0;
  Address : string = ''

  constructor(private authService: Authservice , 
    private formality:Rewardformality ,
    private adminreward:AdminReward ,
    private cdr:ChangeDetectorRef ) {}

    ngOnInit(): void {
      this.RewardLoad();
      this.UserName = this.authService.GetName();
      this.cdr.detectChanges();
      console.log('UserName',this.UserName)
    }

RewardCollection() {

  this.formality
    .RewardCollection(this.RewardId, this.Address)
    .subscribe({
      next: () => {
       this.AddressStatus = false;
        this.RewardId = 0;
        this.Address = '';

        this.RewardLoad();

      },

      error: (err) => {
        console.log(err);
      }
    });
 
}

RewardLoad()
{
    this.adminreward.GetReward().subscribe({

      next:(res:any)=>
      {
          console.log(res)
          this.rewardget=res
          this.cdr.detectChanges()
      }

    })
}

AddressInsert(receivedId:number)
{
    this.RewardId = receivedId;
    this.AddressStatus = true
}


  Logout(): void {
    this.authService.Logout();
    window.location.reload();
  }



isPaused: boolean = false;
  showIndicators: boolean = true;

  slides = [
    { image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200', text: 'Push Beyond Limits' },
    { image: 'https://images.unsplash.com/photo-1540497077202-7c8a3994ab33?q=80&w=1200', text: 'Train Hard' },
    { image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200', text: 'Transform' }
  ];

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



  GetToken(): string | null {
    const token = this.authService.GetToken();
    console.log('Current token:', token);
    return token;}

Message(){
  //Router chage and redirect to message page
  window.location.href = '/chating';
}
Reward()
{
  window.location.href = '/Delivery'
}




}
