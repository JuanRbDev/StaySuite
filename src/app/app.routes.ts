import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth-component/auth-component';
import { LayoutComponent } from './components/layout-component/layout-component';
import { ProfileComponent } from './components/profile-component/profile-component';
import { PageComponent } from './components/page-component/page-component';
import { HomeComponent } from './components/home-component/home-component';
import { ExperiencesComponent } from './components/experiences-component/experiences-component';
import { authGuard } from './security/authGuard';
import { ProfileInforComponent } from './components/profile-infor-component/profile-infor-component';
import { MyReservationsComponent } from './components/my-reservations-component/my-reservations-component';
import { AdminPanel } from './components/admin-panel/admin-panel';
import { adminGuard } from './security/adminGuard';

export const routes: Routes = [

  // 🔐 AUTH
  { path: 'auth', component: AuthComponent },

  // 🌍 PÚBLICO (landing)
  {
    path: 'page',
    component: PageComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'experiences', component: ExperiencesComponent }
    ]
  },

  // 🔒 PRIVADO (requiere login)
  {
    path: 'app', // mejor nombre que "resert"
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      {
        path: 'profile', component: ProfileComponent,
        children: [
          { path: 'info', component: ProfileInforComponent },
          { path: 'myReservations', component: MyReservationsComponent }
        ]
      }
    ],
  },

  {
    path: 'admin',
    component: LayoutComponent,
    canActivate: [authGuard, adminGuard],
    children: [
      {
        path: 'panel',
        component: AdminPanel
      }
    ]
  },

  // 🚀 DEFAULT
  { path: '', redirectTo: 'page', pathMatch: 'full' },

  // ❌ 404
  { path: '**', redirectTo: 'page' }
];
