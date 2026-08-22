import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './Component/Nav/navbar/navbar';
import { Footer } from './Component/Footer/footer/footer';
import { Router , NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [  RouterOutlet ,Navbar , Footer, CommonModule], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
 showNavbar = true;
  constructor(private router: Router) {
    this.router.events.subscribe((event) =>{
      if(event instanceof NavigationEnd)
        {
          if(event.url === '/login' || event.url === '/signup')
            {
              this.showNavbar = false;
            }
            else{
              this.showNavbar = true;
            }
        }
    });
  
}
}