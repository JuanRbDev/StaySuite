import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth/auth-service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-component',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './auth-component.html',
  styleUrl: './auth-component.css',
})
export class AuthComponent {

  isLogin = true;

  register = {
    email: '',
    password: '',
    username: '',
    dni: '',
    firstName: '',
    lastName: '',
    phone: ''
  };

  onRegister(){

  }

  toggle() {
    this.isLogin = !this.isLogin;
  }
  email: string = '';
  password: string = '';


  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onLogin() {
    const data = {
      email: this.email,
      password: this.password
    };

    this.authService.login(data).subscribe({
      next: () => {
        console.log('Login correcto');
        this.router.navigate(['/page']);
      },
      error: () => {
        alert('Credenciales incorrectas');
      }
    });
  }

}
