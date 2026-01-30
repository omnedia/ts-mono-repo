import type { HttpInterceptorFn } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { BehaviorSubject, filter, finalize, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthApiService } from '../services/auth-api.service';
import { RoutingService } from '../services/routing.service';
import { AppStore } from '../stores/app.store';

let isRefreshInFlight = false;
const refreshInFlight = new BehaviorSubject<string | undefined>(undefined);
const refreshInFlight$ = refreshInFlight.asObservable();

export const tokenInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthApiService);
  const routingService = inject(RoutingService);
  const appStore = inject(AppStore);

  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refresh-token');

  const currentPath = window.location.pathname + window.location.search + window.location.hash;

  const originalRequest = request;

  if (token) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(request).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        if (!refreshToken) {
          appStore.updateUser(undefined);

          if (!currentPath.startsWith('/auth')) {
            appStore.updateLastUrl(currentPath);
            routingService.auth();
          }
          return throwError(() => error);
        }

        if (token === refreshToken) {
          localStorage.removeItem('token');
          localStorage.removeItem('refresh-token');

          appStore.updateUser(undefined);

          if (!currentPath.startsWith('/auth')) {
            appStore.updateLastUrl(currentPath);
            routingService.auth();
          }

          return throwError(() => error);
        }

        localStorage.setItem('token', refreshToken);

        if (!isRefreshInFlight) {
          isRefreshInFlight = true;
          return authService.refreshToken().pipe(
            switchMap((response) => {
              const newRequest = originalRequest.clone({
                setHeaders: {
                  Authorization: `Bearer ${response.access_token}`,
                },
              });

              refreshInFlight.next(response.access_token);

              return next(newRequest);
            }),
            finalize(() => {
              isRefreshInFlight = false;
              refreshInFlight.next(undefined);
            }),
          );
        }

        return refreshInFlight$.pipe(
          filter((token) => token !== undefined),
          switchMap((token) => {
            const newRequest = originalRequest.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`,
              },
            });

            return next(newRequest);
          }),
        );
      }

      return throwError(() => error);
    }),
  );
};
