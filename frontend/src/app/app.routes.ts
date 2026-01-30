import type { CustomRouteTypes } from './types/custom-route.types';

export const routes: CustomRouteTypes[] = [
  {
    path: 'auth',
    loadComponent: () => import('./auth/auth.component').then((m) => m.AuthComponent),
  },
  {
    path: '**',
    loadComponent: () => import('./not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
];
