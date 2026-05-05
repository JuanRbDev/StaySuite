import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  let authReq = req;

  // Si hay token, clonamos la petición
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // Manejamos la respuesta para detectar expiración
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        console.warn('Token expirado o inválido. Cerrando sesión...');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.navigate(['/auth']); // Ajusta la ruta a tu login
      }
      return throwError(() => error);
    })
  );
};
