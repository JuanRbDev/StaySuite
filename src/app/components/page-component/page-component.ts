import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-page-component',
  imports: [
    RouterOutlet
  ],
  templateUrl: './page-component.html',
  styleUrl: './page-component.css',
})
export class PageComponent {}
