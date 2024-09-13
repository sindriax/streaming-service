import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject (AuthService)
  const router = inject (Router)

  if (authService.isLogged()){
    return true;
} else {
    router.navigate(['login']);
    return false;
}
};

export const authLoggedGuard: CanActivateFn = () => {

  const authService = inject (AuthService)
  const router = inject (Router)
  
  if (!authService.isLogged()){
      return true;
  } else {
      router.navigate(['login']);
      return false;
  }
}
