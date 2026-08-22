import { Component , OnInit } from '@angular/core';
import { Rewardformality } from '../../../Service/Admin/AdminReward/RewardFormality/rewardformality';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RewardGiven } from '../../../Models/Admin-reward-given/RewardGiven';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-rewardgiven',
  imports: [FormsModule,CommonModule],
  templateUrl: './rewardgiven.html',
  styleUrl: './rewardgiven.css',
})
export class Rewardgiven implements OnInit{

rewardgiven: RewardGiven[]=[]
keyword = ''

  constructor(private reward:Rewardformality,private cdr:ChangeDetectorRef){}

ngOnInit(): void {
  this.LoadRewardGiven()
}

LoadRewardGiven()
{
  
  this.reward.RewardGivenList(this.keyword.trim()).subscribe({
    next:(res:any)=>
    {
      console.log(res)
      this.rewardgiven =res
      this.cdr.detectChanges()
    }
  })
}

}
