import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root',
})
export class ForgetPassword {

private apiUrl = 'https://localhost:7077/api/Auth';

constructor(private http: HttpClient) {}


forgetpassword(email: string) {
  return this.http.post(`${this.apiUrl}/forget-password`, { email });
}

resetpassword(email: string,otp:string) {



  return this.http.post(`${this.apiUrl}/reset-password?email=${email}&otp=${otp}`, {});
}

}
