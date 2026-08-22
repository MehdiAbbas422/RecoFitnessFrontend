import { Component , OnInit} from '@angular/core';
import { Rewardformality } from '../../../Service/Admin/AdminReward/RewardFormality/rewardformality';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { RewardOrder } from '../../../Models/RewardOrder/RewardOreder';


@Component({
  selector: 'app-rewarddelivery',
  imports: [CommonModule , FormsModule],
  templateUrl: './rewarddelivery.html',
  styleUrl: './rewarddelivery.css',
})
export class Rewarddelivery implements OnInit{

  orderreward: RewardOrder[]=[];
constructor(private Reward:Rewardformality, private cdr:ChangeDetectorRef){}

ngOnInit(): void {
  this.loadOrderReward()
}

loadOrderReward()
{
  this.Reward.RwardOrderList().subscribe({
    next:(res:any)=>{
      console.log(res)
     this.orderreward = res
      this.cdr.detectChanges()
    }
  })
}

RiderAccept(orderId:number)
{
  this.Reward.RewardDeliveryCompleted(orderId).subscribe({
    next:()=>{
      this.loadOrderReward()
    },
  })
  
}

}
