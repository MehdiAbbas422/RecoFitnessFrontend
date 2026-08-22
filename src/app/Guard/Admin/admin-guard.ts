import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Authservice } from '../../Service/AuthService/authservice';


export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(Authservice);
   const router = inject(Router);
  const token = authService.GetRole();

  if (token === 'User') {
    router.navigate(['/']);
    return false;
  }
  if(token === null ){
  router.navigate(['/login']);
  return false;
  }

  return true;
};
