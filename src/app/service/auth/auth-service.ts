import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../../interfaces/LoginRequest';
import { LoginResponse } from '../../interfaces/LoginResponse';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private url = 'http://localhost:8080/api/auth';

  constructor(
    private http: HttpClient,
  ) { }

  login(data: LoginRequest) {
    return this.http.post<LoginResponse>(`${this.url}/login`, data)
      .pipe(
        tap(res => {
          localStorage.setItem('token', res.token);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return !!this.getToken();
  }

}
