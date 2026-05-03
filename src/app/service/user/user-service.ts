import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserResponse } from '../../interfaces/UserResponse';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private url = 'http://localhost:8080/api/users';

  private currentUser: UserResponse | null = null;

  constructor(private http: HttpClient) { }

   getProfile() {
    return this.http.get<UserResponse>(`${this.url}/me`)
      .pipe(
        tap(user => {
          localStorage.setItem('user', JSON.stringify(user));
        })
      );
  }

  getCurrentUser(): UserResponse | null {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'ADMIN';
  }

}
