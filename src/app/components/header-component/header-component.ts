import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { UserService } from '../../service/user/user-service';

@Component({
  selector: 'app-header-component',
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule
  ],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
})
export class HeaderComponent {

  menuOpen = false;

  constructor(
    public userService: UserService,
  ){}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }




}
