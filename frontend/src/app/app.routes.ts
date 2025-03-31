import {CustomRoute} from './types/custom-route';

export const routes: CustomRoute[] = [
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
