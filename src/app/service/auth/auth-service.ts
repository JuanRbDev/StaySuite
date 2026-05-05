import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../../interfaces/LoginRequest';
import { LoginResponse } from '../../interfaces/LoginResponse';
import { tap } from 'rxjs';
import { UserService } from '../user/user-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private url = 'http://localhost:8080/api/auth';

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  // auth.service.ts
  login(data: LoginRequest) {
    return this.http.post<LoginResponse>(`${this.url}/login`, data)
      .pipe(
        tap(res => {
          // Guardamos el token para las peticiones (usado por el interceptor)
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
          this.userService.loadUserProfile().subscribe();
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userService.clearUser();
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return !!this.getToken();
  }

}
