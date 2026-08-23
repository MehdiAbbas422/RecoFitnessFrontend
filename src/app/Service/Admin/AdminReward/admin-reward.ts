import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs';
import { RewardCreate } from '../../../Models/Reward/Reward';
import { RewardEdit } from '../../../Models/Reward/Reward';
import { RewardGet } from '../../../Models/Reward/Reward';


@Injectable({
  providedIn: 'root',
})
export class AdminReward {
private apiUrl = '/api/';
constructor(private http: HttpClient) {}

RewardSet(Reward: RewardCreate) {
  return this.http.post(`${this.apiUrl}Reward/setreward`, Reward);
}

GetReward(): Observable<RewardGet[]> {
  return this.http.get<RewardGet[]>(`${this.apiUrl}Reward/getreward`);
}

EditReward(Reward: RewardEdit) {
  return this.http.put(`${this.apiUrl}Reward/editreward/${Reward.id}`, Reward);
}

DeleteReward(RewardId: number){
  return this.http.delete(`${this.apiUrl}Reward/deletereward/${RewardId}`);
}





}
