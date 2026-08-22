import { CanActivateFn } from '@angular/router';
import { Authservice } from '../../Service/AuthService/authservice';
import { inject } from '@angular/core';
import { Router } from '@angular/router';


export const superGuardGuard: CanActivateFn = (route, state) => {

const serves = inject(Authservice)
const Role = serves.GetRole()
const router = inject(Router)


if(Role == 'Admin')
{
  return true
}
else if(Role == 'User')
{
  return true
}

else if(Role == 'Rider')
{
    return true
}

else{
  router.navigate(['/login'])
 return false;
}

 
};
