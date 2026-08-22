import { Component , signal} from '@angular/core';
import {RouterLink} from '@angular/router';

import { Authservice } from '../../../Service/AuthService/authservice';
import { LoginModel } from '../../../Models/Authentication/auth';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink ,FormsModule ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  constructor(private authService: Authservice, private router: Router) {}

  Isloading = signal<boolean>(false)

  LoginInfo: LoginModel = {
    
    Email: '',
    Password: ''    
  };

  Login(): void {
this.Isloading.set(true)
    this.authService.Login(this.LoginInfo).subscribe(
      {next: (response: any) => {
        
        console.log('Login successful:', response);
        if(response.token)
          console.log('Received token:', response.token);
        
          this.authService.SaveToken(response.token );
           
        this.router.navigate(['/']);  
        
      }
      ,error: (error) => {
        this.Isloading.set(false)
        console.error('Login failed:', error);
    }})


}
}