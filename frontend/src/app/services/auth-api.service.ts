import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import type { IUser } from '@shared/interfaces';
import type { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
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
  login(email: string, password: string, staySignedIn: boolean): Observable<void> {
    const url = environment.apiUrl + environment.apiPoints.authLogin;
    const body = { email, password, staySignedIn };
    return this.http
      .post<void>(url, body, this.httpOptions)
      .pipe(takeUntilDestroyed(this.destroyRef));
  }

  /**
   * Get session csrf token
   * POST /auth/csrf
   */
  getCsrf(): Observable<{ csrfToken: string }> {
    const url = environment.apiUrl + environment.apiPoints.authCsrf;
    return this.http
      .get<{ csrfToken: string }>(url, this.httpOptions)
      .pipe(takeUntilDestroyed(this.destroyRef));
  }

  /**
   * Get session csrf token
   * POST /auth/logout
   */
  logout(): Observable<void> {
    const url = environment.apiUrl + environment.apiPoints.authLogout;
    return this.http
      .post<void>(url, {}, this.httpOptions)
      .pipe(takeUntilDestroyed(this.destroyRef));
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
