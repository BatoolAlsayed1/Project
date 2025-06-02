import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

export const appRoutes: Routes = [
  { path: 'signup', loadComponent: () => import('./signup/signup.component').then(m => m.SignupComponent) },
  { path: 'signin', loadComponent: () => import('./signin/signin.component').then(m => m.SigninComponent) },
  { 
    path: 'profile', 
    loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [AuthGuard],  
  },
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
];
