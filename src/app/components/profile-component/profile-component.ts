import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth/auth-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserResponse } from '../../interfaces/UserResponse';
import { UserService } from '../../service/user/user-service';

@Component({
  selector: 'app-profile-component',
  imports: [
    CommonModule
  ],
  templateUrl: './profile-component.html',
  styleUrl: './profile-component.css',
})
export class ProfileComponent implements OnInit {

  user?: UserResponse;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.userService.getProfile().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        console.error('Error al obtener usuario', err);

        // si falla (token inválido o expirado)
        this.logout();
      }
    });
  }

  logout() {
    this.authService.logout(); // mejor usar tu service
    this.router.navigate(['/auth']); // mejor que window.location
  }
}
