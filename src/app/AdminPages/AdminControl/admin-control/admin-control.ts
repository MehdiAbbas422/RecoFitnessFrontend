import { Component  , OnInit} from '@angular/core';
import { AdminControl as Control } from '../../../Service/Admin/AdminControl/admin-control';
import { AdminDeactivatedUser } from '../../../Models/AdminControl/AdminControl';
import {CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- Ye zaroori hai
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-admin-control',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-control.html',
  styleUrl: './admin-control.css',
})
export class AdminControl implements OnInit {

constructor(private adminControl: Control
  ,private cdr:ChangeDetectorRef
) {}

Users: AdminDeactivatedUser[] = []; 
search:any = '';



ngOnInit() {
    this.DeactivateUser(); // Component load hote hi call hoga
  }


DeactivateUser() 
{
  this.adminControl.DeactivateUser(1,this.search).subscribe({
      next: (response : any) => {
console.log('Poora Response:', response.deactivatedUsers
); // Pura object dekhein
    // Agar response direct array hai, toh response.deactivatedUsers na likhein
    this.Users = response.deactivatedUsers
    console.log ('Deactivated Users List:', this.Users); // Final list dekhein
      this.cdr.detectChanges()
 ;
      },
      error: (error) => {
        console.error('Error deactivating user:', error);
      }
    });
  }

Activate(userId: number): void {

this.adminControl.UserActivate(userId).subscribe({
  next: (response) => {
    console.log(response);
     // User activate hone ke baad list ko refresh karna
  },
  error: (error) => {
    console.error('Error activating user:', error);
  }

})
this.DeactivateUser();

}}