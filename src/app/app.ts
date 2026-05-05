import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './service/user/user-service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App implements OnInit {

  protected readonly title = signal('StaySuite');

  currentUser: any = null; // 👈 IMPORTANTE

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.loadUserProfile();
  }

  loadUserFromStorage() {
    const data = localStorage.getItem('user');
    if (data) {
      this.currentUser = JSON.parse(data);
    }
  }
}
