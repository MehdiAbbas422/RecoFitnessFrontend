import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User} from '../../../Models/AdminUser/AdminUser';
import { AdminDeactivate } from '../../../Models/AdminControl/AdminControl';
import { Adminuser } from '../../../Service/Admin/AdminUser/admin-user';
import { AdminControl } from '../../../Service/Admin/AdminControl/admin-control';
import { ChangeDetectorRef } from '@angular/core';



@Component({
  selector: 'app-admin-user',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe, CurrencyPipe],
  templateUrl: './admin-user.html',
  styleUrls: ['./admin-user.css']
})
export class AdminUser implements OnInit {
  users: User[] = [];
  search: string = '';
  searchSuggestions: User[] = [];
  deactivationUser: User | null = null;
  deactivationReason: string = '';
  commonDeactivationReasons = ['Membership Expired', 'Non-Payment', 'Member Request', 'Policy Violation', 'Other'];

  constructor(private service: Adminuser, 
    private adminControl: AdminControl ,
    private cdr :ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.service.GetUsers(1, this.search).subscribe({
      next: (data: any) => {
        this.users = data.users || [];
        this.cdr.detectChanges()
      },
      error: (err) => console.error('Error loading users:', err)

    });
  }

  searchUsers() {
    this.loadUsers();
    this.searchSuggestions = []; // Search ke baad suggestions hata dein
  }

  onSearchInputChange() {
    // Simple filter logic for suggestions
    if (this.search.length > 2) {
      this.searchSuggestions = this.users.filter(u => 
        u.customerName.toLowerCase().includes(this.search.toLowerCase())
      );
    } else {
      this.searchSuggestions = [];
    }
  }

  selectSuggestion(user: User) {
    this.search = user.customerName;
    this.searchSuggestions = [];
    this.searchUsers();
  }

  // Ye function HTML mein 'Deactivate' button se call hota hai
  DeActivateUserButton(user: User) {
    this.deactivationUser = user;
    this.deactivationReason = '';
  }

  // Modal ka 'Confirm' button
  confirmDeactivation() {
    if (!this.deactivationUser) return;
    
    const payload: AdminDeactivate = { 
      id: this.deactivationUser.id, 
      reason: this.deactivationReason 
    };

    this.adminControl.UserDeactivate(payload).subscribe({
      next: () => {
       this.loadUsers(); // List refresh
        this.cancelDeactivation();
         // Deactivation ke baad selected user ko reset kar dein
      },
      error: (err) => console.error('Error:', err)
    });
     
     // Modal close
        this.deactivationUser = null;
  }

  cancelDeactivation() {
    this.deactivationUser = null;
  }

  // CSS Helper Functions
  getPlanTypeClass(plan: any) {
    return plan === 1 ? 'plan-platinum' : 'plan-gold';
  }

  getPaymentStatusClass(status: string) {
    return status?.toLowerCase() === 'paid' ? 'payment-paid' : 'payment-pending';
  }

  getSubscriptionStatusClass(status: string) {
    return status?.toLowerCase() === 'active' ? 'status-active' : 'status-expired';
  }
}