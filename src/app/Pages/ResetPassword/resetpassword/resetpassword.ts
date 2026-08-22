import { Component ,signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Authservice } from '../../../Service/AuthService/authservice';
import { Router } from '@angular/router';


@Component({
  selector: 'app-resetpassword',
  imports: [CommonModule, FormsModule],
  templateUrl: './resetpassword.html',
  styleUrl: './resetpassword.css',
})
export class Resetpassword {

  Isloading = signal<boolean>(false)

  
  NewPassword :string ='';


constructor(private authService: Authservice , private router: Router) {}

ResetPassword(): void {
  this.Isloading.set(true);
   if (!this.NewPassword.trim()) {
      console.log('Password is required');
      return;
    }
  const password = this.NewPassword;

     
  this.authService.ProfilePasswordChange(password).subscribe(
    {
      next: (response: any) => {
        console.log('Password reset successful:', response);
        this.Isloading.set(false);
        // Handle success, e.g., show a success message or redirect
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Password reset failed:', err);
        this.Isloading.set(false);
        // Handle error, e.g., show an error message
      }
    }
  );

}
}
