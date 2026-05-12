import type { HttpInterceptorFn } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { BehaviorSubject, EMPTY, filter, finalize, switchMap, take, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../api';
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
  const authenticationService = inject(AuthenticationService);

  const originalRequest = request;

  const currentPath = window.location.pathname + window.location.search + window.location.hash;

  request = request.clone({
    withCredentials: true,
  });

  const csrfToken = appStore.csrfToken();
  if (isStateChanging(request.method) && csrfToken) {
    request = request.clone({
      setHeaders: { 'x-csrf-token': csrfToken },
    });
  }

  return next(request).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse && (error.status === 401 || error.status === 0)) {
        appStore.updateUser(undefined);
        appStore.updateCsrfToken(undefined);

        if (!currentPath.startsWith('/auth')) {
          appStore.updateCurrentUrl(currentPath);
          routingService.auth();
        }
        return EMPTY;
      }

      if (error instanceof HttpErrorResponse && (error.status === 403 || error.status === 419)) {
        if (!isStateChanging(originalRequest.method)) {
          return throwError(() => error);
        }

        if (!isCsrfFetchInFlight) {
          isCsrfFetchInFlight = true;

          return authenticationService.getCsrf().pipe(
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
