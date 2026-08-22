import { CanActivateFn } from '@angular/router';
import { Authservice } from '../../Service/AuthService/authservice';
import { Router } from '@angular/router';
import { inject } from '@angular/core';



export const riderGuard: CanActivateFn = (route, state) => {

const serves = inject(Authservice);
const routes = inject(Router);
const role = serves.GetRole();

if(role === 'Admin')
{
  return true;
}
else if(role === 'Rider')
{
  return true;
}

else if(role === 'User'){
  routes.navigate(['/'])
  return false
}

else{
  routes.navigate(['/login'])
  return false;
}

 
};
