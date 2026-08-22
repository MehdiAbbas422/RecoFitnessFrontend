import { Component, AfterViewInit ,Signal, signal , OnInit} from '@angular/core'; // 1. AfterViewInit import karein
import { LucideAngularModule, Dumbbell, LayoutDashboard } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { Authservice } from '../../../Service/AuthService/authservice';
import { Payment } from '../../../Service/Payment/payment';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink, LucideAngularModule,CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
// 2. Class mein "implements AfterViewInit" add karein
export class Navbar implements AfterViewInit , OnInit{ 
  isMenuOpen = false;
  Id: string | null;
  Role: string | null  ='';
  NavBarLocation = signal<boolean>(false)
  RiderNavLocation = signal<boolean>(false)

  constructor(private AuthService: Authservice, private PaymentService: Payment) {
    this.Id = this.AuthService.GetId();
    this.Role = this.AuthService.GetRole();
  }

  ngOnInit(): void {
        if(this.Role == 'Rider')
    {
        this.RiderNavLocation.set(true)
    }
  }
  // 3. Yahan method add karein
  ngAfterViewInit() {
    // @ts-ignore
    lucide.createIcons();
  }

  isExpanded = false;

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }

  // ... baaki aapka purana code (Logout, Payment, etc.) ...
  Logout(): void {
    this.AuthService.Logout();
    window.location.reload();
  }

  GetToken(): string | null {
    const token = this.AuthService.GetRole();
    console.log('Current token:', token);
    return token;
  }

  Payment() {
    this.PaymentService.CreatePayment(this.Id).subscribe(
      (response: any) => {
        if (response && response.url ) {
          window.location.href = response.url;
        } else {
          console.error("Backend se Checkout URL nahi mili!");
        }
      },
      (error) => {
        console.error("API Call fail ho gayi:", error);
      }
    );
  }
}