import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-component',
  imports: [
    FormsModule
  ],
  templateUrl: './auth-component.html',
  styleUrl: './auth-component.css',
})
export class AuthComponent {

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
        this.router.navigate(['/app']);
      },
      error: () => {
        alert('Credenciales incorrectas');
      }
    });
  }

}
