import { Injectable  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { AdminDeactivatedUser } from '../../../Models/AdminControl/AdminControl';
import { AdminDeactivate } from '../../../Models/AdminControl/AdminControl';


@Injectable({
  providedIn: 'root',
})
export class AdminControl {
  private apiUrl = '/api/';
private constructor(private http: HttpClient) {}

UserDeactivate(User: any) {
  return this.http.post(`${this.apiUrl}Admin/user-deactivate/${User.id}?reason=${User.reason}`, {});
}

UserActivate(UserId: number) {
  return this.http.post(`${this.apiUrl}Admin/user-activate/${UserId}`, {});
}

DeactivateUser(page: number,search:any): Observable<AdminDeactivatedUser[]> {
  return this.http.get<AdminDeactivatedUser[]>(`${this.apiUrl}Admin/deactivated-users?page=${page}&search=${search}`);
}

}