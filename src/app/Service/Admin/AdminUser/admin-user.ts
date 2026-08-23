import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../../Models/AdminUser/AdminUser';
import {UserInfo} from '../../../Models/AdminUser/AdminUser';

@Injectable({
  providedIn: 'root',
})
export class Adminuser {


private apiUrl = '/api/';
constructor(private http: HttpClient) {}

GetUsers(page:number ,search :string): Observable<UserInfo> {
  return this.http.get<UserInfo>(`${this.apiUrl}Admin/User?page=${page}&search=${search}`);
}

}
