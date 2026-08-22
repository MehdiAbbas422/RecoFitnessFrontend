import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class Rewardformality {

private apiUrl = 'http://RecoFit.somee.com/api/';
constructor(private http: HttpClient) {}


//Reward Verify kr ne ke liye ke is ki Streak Reward ke Mouth Requirment se mil ti hai ya nhi
RewardCollection(RewardId: number,address: string){
  return this.http.post(`${this.apiUrl}Reward/rewardcollection/${RewardId}?address=${address}`,{});
}

//Ye jab Order complete ho jae to user ke pass confirmation ke liye ke order mil gia
RewardDeliveryCompleted(orderid: number){
  return this.http.post(`${this.apiUrl}Reward/rewarddeliverycompleted/${orderid}`,{});
}

RwardOrderList()
{
    return this.http.get(`${this.apiUrl}Reward/rewardorderlist`);
}
 

//Ye jab user click kr ga to order complete ho gia matlab
RewardGivenList(Keyword? : string)
{
    return this.http.get(`${this.apiUrl}Reward/rewardgivenlist?keyword=${Keyword}`);
}

//Ye User ke pass as a mesage show hoga ke ye order hai aa raha hai 
DeliveryAccepts()
{
    return this.http.get(`${this.apiUrl}Reward/deliveryaccepts`);
}

Accept(DeliveryId: number)
{
 return this.http.post(`${this.apiUrl}Reward/accept/${DeliveryId}`,{});
}

}