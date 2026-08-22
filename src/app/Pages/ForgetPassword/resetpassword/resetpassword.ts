import { Component , signal } from '@angular/core';
import { ForgetPassword } from '../../../Service/AuthForgetPassword/forget-password';
import { FormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';
import { Router } from '@angular/router';
import { Authservice } from '../../../Service/AuthService/authservice';

@Component({
  selector: 'app-resetpassword',
  imports: [FormsModule, CommonModule],
  templateUrl: './resetpassword.html',
  styleUrl: './resetpassword.css',
})
export class Resetpassword {

email = signal('');
otp = signal('');
emailconfirm = signal<boolean>(false);
Isloading = signal<boolean>(false)

constructor(private forgetPasswordService: ForgetPassword, private router: Router , private authService: Authservice) {}


forgetPassword() {
this.Isloading.set(true)
this.forgetPasswordService.forgetpassword(this.email()).subscribe(
  (response:any) => {
    this.Isloading.set(false)
    this.emailconfirm.set(true);
    // Handle success (e.g., show a success message)
  },
  (error:any) => {
    console.error('Error sending password reset email:', error);
    this.Isloading.set(false)
    // Handle error (e.g., show an error message)
  }
);


}



resetPassword() {
  this.Isloading.set(true)
  
  this.forgetPasswordService.resetpassword(this.otp(), this.email()).subscribe(
    (response:any) => {
      console.log('Password reset successful:', response);
      this.email.set('');
      this.otp.set('');
      this.emailconfirm.set(false);
       this.Isloading.set(false)
      this.authService.SaveToken(response.token); // Navigate to the login page after successful reset
      this.router.navigate(['/reset-password']); // Navigate to the login page after successful reset
     
    },
    (error:any) => {
      console.error('Error resetting password:', error);
      this.emailconfirm.set(false);
      this.Isloading.set(false)
      // Handle error (e.g., show an error message)
    }
  );

}
}
