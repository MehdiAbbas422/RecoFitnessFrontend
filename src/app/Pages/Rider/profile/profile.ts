import { Component , signal} from '@angular/core';
import { Rewardformality } from '../../../Service/Admin/AdminReward/RewardFormality/rewardformality';
import { Delivery } from '../../../Models/Delivery/Delivery';
import { OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {

delivary : Delivery[]=[]

constructor(private reward:Rewardformality , private cdr:ChangeDetectorRef){}

ngOnInit(): void {
  this.LoadDelivery()
}

LoadDelivery()
{
  this.reward.DeliveryAccepts().subscribe({
    next:(res:any)=>{
      console.log(res)
      this.delivary = res
      this.cdr.detectChanges()
    },
    error(err) {
      console.log(err)
    },
  })
}





}
