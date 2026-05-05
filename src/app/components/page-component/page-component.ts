import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../header-component/header-component";

@Component({
  selector: 'app-page-component',
  imports: [
    RouterOutlet,
    HeaderComponent
],
  templateUrl: './page-component.html',
  styleUrl: './page-component.css',
})
export class PageComponent {}
