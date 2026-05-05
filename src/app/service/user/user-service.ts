import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { UserResponse } from '../../interfaces/UserResponse';

@Injectable({ providedIn: 'root' })
export class UserService {
  private url = 'http://localhost:8080/api/users';

  // El "Estado Global" del usuario
  private userSubject = new BehaviorSubject<UserResponse | null>(this.getUserFromStorage());
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) { }

  // Función auxiliar para recuperar el usuario al arrancar
  private getUserFromStorage(): UserResponse | null {
    const data = localStorage.getItem('user');
    if (!data || data === 'undefined') return null;
    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  }

  loadUserProfile(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) return of(false);

    return this.http.get<UserResponse>(`${this.url}/me`).pipe(
      tap(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user); // Actualiza con info fresca del servidor
      }),
      map(() => true),
      catchError(() => {
        this.clearUser();
        return of(false);
      })
    );
  }

  // Método síncrono para check rápido
  // user-service.ts
  isAdmin(): boolean {
    const data = localStorage.getItem('user');

    // Si no hay datos, o el dato es la palabra "undefined", no intentamos parsear
    if (!data || data === 'undefined') {
      return false;
    }

    try {
      const user = JSON.parse(data);
      return user?.role === 'ADMIN';
    } catch (e) {
      return false; // Si el JSON está mal formado, devolvemos false
    }
  }

  clearUser() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.userSubject.next(null); // 🔥 Esto limpia el Header al cerrar sesión
  }

  updateUser(user: UserResponse) {
  localStorage.setItem('user', JSON.stringify(user));
  this.userSubject.next(user); // 🔥 Esto es lo que hace que el Header cambie al instante
}
}
