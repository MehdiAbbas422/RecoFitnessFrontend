import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Authservice } from '../../Service/AuthService/authservice';


export const userGuard: CanActivateFn = (route, state) => {
  const authService = inject(Authservice);
  const router = inject(Router);
  const token = authService.GetRole();

  if (token === 'Admin') {
    
    return true;
  }

  else if (token === 'User') {
    return true;
  }
  else{
  router.navigate(['/login']);
  return false;
   }
};
