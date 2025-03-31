import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./auth/auth.component').then(
      (m) => m.AuthComponent,
    ),
  },
  {
    path: '**',
    loadComponent: () => import('./not-found/not-found.component').then(
      (m) => m.NotFoundComponent,
    ),
  },
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
];
