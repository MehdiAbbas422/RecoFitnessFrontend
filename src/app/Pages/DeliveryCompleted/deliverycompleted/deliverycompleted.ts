import { Component ,OnInit} from '@angular/core';
import { Rewardformality } from '../../../Service/Admin/AdminReward/RewardFormality/rewardformality';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { Delivery } from '../../../Models/Delivery/Delivery';



@Component({
  selector: 'app-deliverycompleted',
  imports: [CommonModule,FormsModule],
  templateUrl: './deliverycompleted.html',
  styleUrl: './deliverycompleted.css',
})
export class Deliverycompleted implements OnInit{

delivery: Delivery[]=[]

constructor(private Reward:Rewardformality , private cdr:ChangeDetectorRef  ){}

ngOnInit(): void {
  this.LoadDelivery()
}

LoadDelivery()
{
  this.Reward.DeliveryAccepts().subscribe({
    next:(res:any)=>{
      console.log(res)
      this.delivery = res
      this.cdr.detectChanges();
    }
  })
}

Acceptdelivery(deliveryId:number)
{
  this.Reward.Accept(deliveryId).subscribe({
    next:()=>
    {
        this.LoadDelivery()
    }
  })
  
}
}
