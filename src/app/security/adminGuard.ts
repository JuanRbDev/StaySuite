import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../service/user/user-service';

export const adminGuard: CanActivateFn = () => {
  const userService = inject(UserService);
  const router = inject(Router);

  const user = userService.getCurrentUser(); // SIEMPRE desde localStorage

  if (user?.role === 'ADMIN') {
    return true;
  }

  return router.createUrlTree(['/page/home']);
};
