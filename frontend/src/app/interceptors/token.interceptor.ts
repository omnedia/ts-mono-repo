import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthApiService} from '../services/auth-api.service';
import {throwError} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';

export const tokenInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthApiService);

  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refresh-token');

  const currentPath = window.location.pathname;

  const originalRequest = request;

  if (token) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  } else if (refreshToken) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
  }

  return next(request).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        if (!token && !refreshToken) {
          if (!currentPath.startsWith('/auth')) {
            window.location.href = "/auth";
          }

          return throwError(() => error);
        }

        localStorage.removeItem('token');

        return authService.refreshToken().pipe(
          switchMap((response) => {
            const newRequest = originalRequest.clone({
              setHeaders: {
                Authorization: `Bearer ${response.access_token}`,
              },
            });

            return next(newRequest);
          }),
          catchError((refreshError) => {
            if (refreshError instanceof HttpErrorResponse && refreshError.status === 401) {
              localStorage.removeItem('token');
              localStorage.removeItem('refresh-token');

              if (!currentPath.startsWith('/auth')) {
                window.location.href = "/auth";
              }
            }

            return throwError(() => refreshError);
          }),
        );
      }

      return throwError(() => error);
    })
  );
};
