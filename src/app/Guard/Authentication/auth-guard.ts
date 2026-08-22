import { inject } from '@angular/core';
import { CanActivateFn , Router } from '@angular/router';
import { Authservice } from '../../Service/AuthService/authservice';

export const authGuard: CanActivateFn = (route, state) => {
var Servive = inject(Authservice);
var token = localStorage.getItem('token');
var role = Servive.GetRole();
const router = inject(Router);

if (token === null) {
  return true;
}
if(role === null)
{
  return true;
}

 router.navigate(['/']);
  return false;
};
