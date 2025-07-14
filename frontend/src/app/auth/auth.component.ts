import {Component, OnDestroy, OnInit, signal} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthApiService} from '../services/auth-api.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {ProgressSpinner} from 'primeng/progressspinner';

import {Checkbox} from 'primeng/checkbox';
import {AppStore} from '../stores/app.store';
import {RoutingService} from '../services/routing.service';

@Component({
  selector: 'app-auth',
  imports: [
    ReactiveFormsModule,
    ProgressSpinner,
    Checkbox
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  standalone: true,
})
export class AuthComponent implements OnInit, OnDestroy {
  formView: 'login' | 'register' = 'login';

  loginForm: FormGroup;
  registerForm: FormGroup;

  submitted = signal<boolean>(false);
  errorMessage = signal<string | undefined>(undefined);

  loading = signal<boolean>(false);

  constructor(
    private readonly authApiService: AuthApiService,
    private readonly fb: FormBuilder,
    private readonly appStore: AppStore,
    private readonly routingService: RoutingService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      staySignedIn: [false]
    });

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordCheck: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getUser();

    this.appStore.user$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      if (user) {
        this.routingService.home();
      }
    })
  }

  destroy$ = new Subject<void>()

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  login(): void {
    this.submitted.set(true);

    if (this.loginForm.invalid) return;

    const {email, password, staySignedIn} = this.loginForm.value;

    this.loading.set(true);

    this.authApiService.login(email, password, staySignedIn)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (staySignedIn && response.refresh_token) {
            localStorage.setItem('refresh-token', response.refresh_token);
          }

          localStorage.setItem('token', response.access_token);

          this.loginForm.reset();
          this.submitted.set(false);
          this.errorMessage.set(undefined);

          this.getUser();
        },
        error: (error) => {
          this.loginForm.patchValue({password: ''});
          this.errorMessage.set('Invalid username or password');
          this.submitted.set(false);
          this.loading.set(false);
        }
      });
  }

  register(): void {
    this.submitted.set(true);

    if (this.registerForm.invalid) return;

    const {email, password, passwordCheck} = this.registerForm.value;

    if (password !== passwordCheck) {
      this.errorMessage.set('The Password and Password-Check must be equal.');
      this.registerForm.patchValue({password: '', passwordCheck: ''});
      return;
    }

    this.loading.set(true);

    this.authApiService.register(email, password)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.registerForm.reset();
          this.submitted.set(false);
          this.errorMessage.set(undefined);

          this.loginForm.patchValue({email: email, password: '', staySignedIn: false});
          this.formView = 'login';

          this.loading.set(false);
        },
        error: (error) => {
          if (error instanceof HttpErrorResponse && error.status === 409) {
            this.errorMessage.set('The username is already in use.');
            this.registerForm.patchValue({email: ''});
          } else {
            this.errorMessage.set('An error occurred. Try again.');
          }

          this.registerForm.patchValue({password: '', passwordCheck: ''});
          this.submitted.set(false);
          this.loading.set(false);
        }
      });
  }

  getUser(): void {
    this.authApiService.getCurrentUser().pipe(takeUntil(this.destroy$)).subscribe({
      next: (user) => {
        this.loading.set(false);

        this.appStore.updateUser(user);
      }
    })
  }

  switchFormView(): void {
    this.submitted.set(false);
    this.loginForm.reset();
    this.registerForm.reset();
    this.errorMessage.set(undefined);

    if (this.formView === 'login') {
      this.formView = 'register';
    } else {
      this.formView = 'login';
    }
  }

  hasFormError(controlName: string): boolean {
    let control: AbstractControl<any, any> | null = null;

    if (this.formView === 'login') {
      control = this.loginForm.get(controlName);
    } else {
      control = this.registerForm.get(controlName);
    }
    return this.submitted() && control?.invalid!;
  }
}
