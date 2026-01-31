import type { HttpInterceptorFn } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { BehaviorSubject, filter, finalize, switchMap, take, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthApiService } from '../services/auth-api.service';
import { RoutingService } from '../services/routing.service';
import { AppStore } from '../stores/app.store';

let isCsrfFetchInFlight = false;
const csrfInFlight = new BehaviorSubject<string | undefined>(undefined);
const csrfInFlight$ = csrfInFlight.asObservable();

function isStateChanging(method: string) {
  const m = method.toUpperCase();
  return m === 'POST' || m === 'PUT' || m === 'PATCH' || m === 'DELETE';
}

export const csrfInterceptor: HttpInterceptorFn = (request, next) => {
  const routingService = inject(RoutingService);
  const appStore = inject(AppStore);
  const authApiService = inject(AuthApiService);

  const originalRequest = request;

  const currentPath = window.location.pathname + window.location.search + window.location.hash;

  const csrfToken = appStore.csrfToken();
  if (isStateChanging(request.method) && csrfToken) {
    request = request.clone({
      setHeaders: { 'x-csrf-token': csrfToken },
    });
  }

  return next(request).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        appStore.updateUser(undefined);

        if (!currentPath.startsWith('/auth')) {
          appStore.updateLastUrl(currentPath);
          routingService.auth();
        }
        return throwError(() => error);
      }

      if (error instanceof HttpErrorResponse && (error.status === 403 || error.status === 419)) {
        if (!isStateChanging(originalRequest.method)) {
          return throwError(() => error);
        }

        if (!isCsrfFetchInFlight) {
          isCsrfFetchInFlight = true;

          return authApiService.getCsrf().pipe(
            switchMap(({ csrfToken }) => {
              appStore.updateCsrfToken(csrfToken);

              csrfInFlight.next(csrfToken);

              const retryReq = originalRequest.clone({
                withCredentials: true,
                setHeaders: { 'x-csrf-token': csrfToken },
              });

              return next(retryReq);
            }),
            finalize(() => {
              isCsrfFetchInFlight = false;
              csrfInFlight.next(undefined);
            }),
          );
        }

        return csrfInFlight$.pipe(
          filter((t) => t !== undefined),
          take(1),
          switchMap((t) => {
            const retryReq = originalRequest.clone({
              withCredentials: true,
              setHeaders: { 'x-csrf-token': t! },
            });
            return next(retryReq);
          }),
        );
      }

      return throwError(() => error);
    }),
  );
};
