import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminEarning {

private apiUrl = 'http://RecoFit.somee.com/api/';
constructor(private http: HttpClient) {}

EarningGet() {
  return this.http.get(`${this.apiUrl}Earning/Earning`);
}

}
