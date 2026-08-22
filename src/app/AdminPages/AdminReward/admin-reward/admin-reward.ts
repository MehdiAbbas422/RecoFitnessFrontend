import { Component , OnInit , signal} from '@angular/core';
import { AdminReward as Reward} from '../../../Service/Admin/AdminReward/admin-reward';
import { RewardCreate } from '../../../Models/Reward/Reward';
import { RewardEdit } from '../../../Models/Reward/Reward';
import { RewardGet } from '../../../Models/Reward/Reward';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-admin-reward',
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-reward.html',
  styleUrl: './admin-reward.css',
})
export class AdminReward implements OnInit{

  Isloading = signal<boolean>(false)
  rewardget : RewardGet[] =[]
  rewardedit: RewardEdit ={id:0,rewardItem:'',description:'',months:0};
  rewardcreate:RewardCreate={rewardItem:'',description:'',months:0}

constructor(private Reward:Reward ,   private cdr: ChangeDetectorRef
){}

ngOnInit(): void {
  this.LoadReward()
}

LoadReward()
{   
  this.Isloading.set(true)
  this.Reward.GetReward().subscribe({
    next: (res) => {   
      console.log(res)
      this.rewardget = res
      this.cdr.detectChanges();
      this.Isloading.set(false)
    },
    error:(err)=>{
      this.Isloading.set(false)
      console.log(err)
    },
  })
}

CreateReward(rewardcreate: RewardCreate)
{
  this.Isloading.set(true)
  console.log(rewardcreate)
  this.Reward.RewardSet(rewardcreate).subscribe({
    next:(res:any) => {
      console.log(res);
      this.LoadReward()
      this.Reset()
      this.Isloading.set(false)
    },

    error: (err) => {
      this.Isloading.set(false)
      console.log(err);
      
    }
  });
     
}

EditReward(rewardedit:RewardEdit)
{
  this.Isloading.set(true)
    this.Reward.EditReward(rewardedit).subscribe({
      next:()=>{
        this.Isloading.set(false)
 } })
 this.LoadReward()
    this.Reset()
    
}

EditButton(reward:any)
{
  this.rewardedit.id=  reward.id
  this.rewardedit.description = reward.description
  this.rewardedit.months =reward.months
  this.rewardedit.rewardItem =reward.rewardItem
}

DeleteReward(id:number)
{
  this.Isloading.set(true)
  this.Reward.DeleteReward(id).subscribe({
    next:()=>{
      this.Isloading.set(false)
    }
  })
  this.LoadReward()
}

Reset()
{
  this.rewardcreate.months=0
  this.rewardcreate.rewardItem=''
  this.rewardcreate.description=''
  this.rewardedit.id=0
  this.rewardedit.months=0
  this.rewardedit.rewardItem=''
  this.rewardedit.description=''
}

}
