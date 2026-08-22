import { Authservice } from '../../../Service/AuthService/authservice';
import { RegisterModel } from '../../../Models/Authentication/auth';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Component , signal } from '@angular/core';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-sigup',
  standalone: true,
  imports: [RouterLink ,FormsModule ],
  templateUrl: './sigup.html',
  styleUrl: './sigup.css',
})
export class Sigup {

  otp = signal<boolean>(false)
  OTP = signal<string>('')
Message = signal<string>('')
email = signal<string>('')
Isloading = signal<boolean>(false)

RegisterInfo: RegisterModel = {
    CustomerName: '',
    Email: '',
    Password: '',
    PlanType: 0,
    PhoneNumber: ''
  };

    constructor(private authService: Authservice, private router: Router) {}

Register(): void {
  this.Isloading.set(true)
    this.authService.Register(this.RegisterInfo).subscribe(
      {next: (response: any) => {
        
        console.log('Registration successful:', response);
       if(response.message == "Your are already register but not verify please verify your Email"|| "OTP is sended please verify your Email" )
         {
          this.email.set(this.RegisterInfo.Email);
          this.otp.set(true)
         }
          this.Message.set(response.message);
         console.log('Registration successful:', this.Message());
         console.log('Received message:', this.Message());
         
         this.Isloading.set(false)
        


},
error:(err)=>
{
  this.Message.set('Register'+ err.error.message);
    this.Isloading.set(false)
  console.log(err)
}

}


)}

RegisterOtp(): void {
this.Isloading.set(true)
var email = this.email()
var otp = this.OTP()
this.authService.RegisterOtp(email, otp).subscribe({
  next:(res:any)=>{
      
      console.log(res)
      this.authService.SaveToken(res.token);
      this.router.navigate(['/login']);
      this.Isloading.set(false)
  },
  error:(err)=>{
    console.log(err)
    this.Message.set('Register'+ err.error.message);
    this.Isloading.set(false)
  }
})
}




}