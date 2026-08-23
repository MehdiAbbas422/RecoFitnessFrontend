import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class Payment {

  private api ="/api/Payment";
constructor(private http: HttpClient) {}

CreatePayment(Id:any):Observable<any>{
  return this.http.post<any>(`${this.api}/create-checkout-session/${Id}`, {});
}

}
