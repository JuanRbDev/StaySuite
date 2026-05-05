import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../service/user/user-service';
import { catchError, map, of } from 'rxjs';

export const adminGuard: CanActivateFn = () => {
  const userService = inject(UserService);
  const router = inject(Router);

  // 1. Intentamos ver si ya es admin (lectura rápida)
  if (userService.isAdmin()) {
    return true;
  }

  // 2. Si no es admin (o el usuario no existe en storage aún),
  // tenemos que pedirlo al servidor ANTES de decidir.
  return userService.loadUserProfile().pipe(
    map(success => {
      if (success && userService.isAdmin()) {
        return true;
      }
      console.warn('No tienes permisos de administrador');
      return router.createUrlTree(['/page/home']);
    }),
    catchError(() => {
      return of(router.createUrlTree(['/auth']));
    })
  );
};
