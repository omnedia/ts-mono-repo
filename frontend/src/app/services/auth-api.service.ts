import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, filter, Observable, of, Subject, take, tap, throwError} from 'rxjs';
import {catchError, switchMap, takeUntil} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {IAuthResponse, IUser} from '@shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService implements OnDestroy {
  private refreshing = false;
  private refreshTokenSubject = new BehaviorSubject<string | null>(null);

  private destroy$ = new Subject<void>();

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    withCredentials: true,
  };

  constructor(private readonly http: HttpClient) {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Register a new user
   * POST /auth/register
   */
  register(email: string, password: string): Observable<void> {
    const url = environment.apiUrl + environment.apiPoints.authRegister;
    const body = {email, password};
    return this.http
      .post<void>(url, body, this.httpOptions)
      .pipe(takeUntil(this.destroy$));
  }

  /**
   * Log in a user
   * POST /auth/login
   */
  login(email: string, password: string, staySignedIn: boolean): Observable<IAuthResponse> {
    const url = environment.apiUrl + environment.apiPoints.authLogin;
    const body = {email, password, staySignedIn};
    return this.http
      .post<IAuthResponse>(url, body, this.httpOptions)
      .pipe(takeUntil(this.destroy$));
  }

  /**
   * Refresh access token
   * POST /auth/refresh
   */
  refreshToken(): Observable<IAuthResponse> {
    if (this.refreshing) {
      return this.refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(token => of({access_token: token}))
      );
    } else {
      this.refreshing = true;
      this.refreshTokenSubject.next(null);

      const url = environment.apiUrl + environment.apiPoints.authRefresh;
      return this.http
        .post<IAuthResponse>(url, {}, this.httpOptions)
        .pipe(
          tap(response => {
            const newToken = response.access_token;
            localStorage.setItem('token', newToken);

            this.refreshing = false;
            this.refreshTokenSubject.next(newToken);
          }),
          catchError(err => {
            localStorage.removeItem('refresh-token');

            this.refreshing = false;
            this.refreshTokenSubject.next(null);
            return throwError(() => err);
          }),
          takeUntil(this.destroy$)
        );
    }
  }

  /**
   * Get current user
   * GET /auth/user
   */
  getCurrentUser(): Observable<IUser> {
    const url = environment.apiUrl + environment.apiPoints.authUser;
    return this.http
      .get<IUser>(url, this.httpOptions)
      .pipe(takeUntil(this.destroy$));
  }

  /**
   * Get current user
   * GET /auth/change-password
   */
  changeUserPassword(password: string): Observable<void> {
    const url = environment.apiUrl + environment.apiPoints.changePassword;
    return this.http
      .put<void>(url, {password: password}, this.httpOptions)
      .pipe(takeUntil(this.destroy$));
  }
}
