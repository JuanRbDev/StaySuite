import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    // 1. Nos suscribimos al observable global.
    // Si el Guard ya cargó al usuario, aquí aparecerá al instante.
    this.userService.user$.subscribe(userData => {
      if (userData) {
        this.user = userData;
        this.cdr.detectChanges();
      } else {
        // 2. Si no hay usuario en el estado, intentamos cargarlo
        this.loadData();
      }
    });
  }

  loadData() {
    this.userService.loadUserProfile().subscribe({
      error: () => this.logout()
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}
