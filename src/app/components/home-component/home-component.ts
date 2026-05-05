import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { FeaturesComponent } from "../features-component/features-component";

@Component({
  selector: 'app-home-component',
  imports: [
    FeaturesComponent
],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent {}
