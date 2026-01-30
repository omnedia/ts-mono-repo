import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import type { IAuthResponse, IUser } from '@shared/interfaces';
import type { Observable } from 'rxjs';
import { BehaviorSubject, filter, of, take, tap, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private refreshing = false;
  private refreshTokenSubject = new BehaviorSubject<string | null>(null);

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true,
  };

  private readonly http = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);

  /**
   * Register a new user
   * POST /auth/register
   */
  register(email: string, password: string): Observable<void> {
    const url = environment.apiUrl + environment.apiPoints.authRegister;
    const body = { email, password };
    return this.http
      .post<void>(url, body, this.httpOptions)
      .pipe(takeUntilDestroyed(this.destroyRef));
  }

  /**
   * Log in a user
   * POST /auth/login
   */
  login(email: string, password: string, staySignedIn: boolean): Observable<IAuthResponse> {
    const url = environment.apiUrl + environment.apiPoints.authLogin;
    const body = { email, password, staySignedIn };
    return this.http
      .post<IAuthResponse>(url, body, this.httpOptions)
      .pipe(takeUntilDestroyed(this.destroyRef));
  }

  /**
   * Refresh access token
   * POST /auth/refresh
   */
  refreshToken(): Observable<IAuthResponse> {
    if (this.refreshing) {
      return this.refreshTokenSubject.pipe(
        filter((token) => token !== null),
        take(1),
        switchMap((token) => of({ access_token: token })),
      );
    } else {
      this.refreshing = true;
      this.refreshTokenSubject.next(null);

      const url = environment.apiUrl + environment.apiPoints.authRefresh;
      return this.http.post<IAuthResponse>(url, {}, this.httpOptions).pipe(
        tap((response) => {
          const newToken = response.access_token;
          localStorage.setItem('token', newToken);

          this.refreshing = false;
          this.refreshTokenSubject.next(newToken);
        }),
        catchError((err) => {
          localStorage.removeItem('refresh-token');

          this.refreshing = false;
          this.refreshTokenSubject.next(null);
          return throwError(() => err);
        }),
        takeUntilDestroyed(this.destroyRef),
      );
    }
  }

  /**
   * Get current user
   * GET /auth/user
   */
  getCurrentUser(): Observable<IUser> {
    const url = environment.apiUrl + environment.apiPoints.authUser;
    return this.http.get<IUser>(url, this.httpOptions).pipe(takeUntilDestroyed(this.destroyRef));
  }

  /**
   * Get current user
   * GET /auth/change-password
   */
  changeUserPassword(password: string): Observable<void> {
    const url = environment.apiUrl + environment.apiPoints.changePassword;
    return this.http
      .put<void>(url, { password: password }, this.httpOptions)
      .pipe(takeUntilDestroyed(this.destroyRef));
  }
}
