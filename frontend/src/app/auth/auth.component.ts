import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthApiService} from '../services/auth-api.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {ProgressSpinner} from 'primeng/progressspinner';
import {CommonModule} from '@angular/common';
import {Checkbox} from 'primeng/checkbox';
import {AppStore} from '../stores/app.store';
import {RoutingService} from '../services/routing.service';

@Component({
  selector: 'app-auth',
  imports: [
    ReactiveFormsModule,
    ProgressSpinner,
    CommonModule,
    Checkbox
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  standalone: true
})
export class AuthComponent implements OnInit, OnDestroy {
  formView: 'login' | 'register' = 'login';

  loginForm: FormGroup;
  registerForm: FormGroup;

  submitted = false;
  errorMessage?: string = undefined;

  loading = false;

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
    this.submitted = true;

    if (this.loginForm.invalid) return;

    const {email, password, staySignedIn} = this.loginForm.value;

    this.loading = true;

    this.authApiService.login(email, password, staySignedIn)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (staySignedIn && response.refresh_token) {
            localStorage.setItem('refresh-token', response.refresh_token);
          }

          localStorage.setItem('token', response.access_token);

          this.loginForm.reset();
          this.submitted = false;
          this.errorMessage = undefined;

          this.getUser();
        },
        error: (error) => {
          this.loginForm.patchValue({password: ''});
          this.errorMessage = 'Invalid username or password';
          this.submitted = false;
          this.loading = false;
        }
      });
  }

  register(): void {
    this.submitted = true;

    if (this.registerForm.invalid) return;

    const {email, password, passwordCheck} = this.registerForm.value;

    if (password !== passwordCheck) {
      this.errorMessage = 'The Password and Password-Check must be equal.';
      this.registerForm.patchValue({password: '', passwordCheck: ''});
      return;
    }

    this.loading = true;

    this.authApiService.register(email, password)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.registerForm.reset();
          this.submitted = false;
          this.errorMessage = undefined;

          this.loginForm.patchValue({email: email, password: '', staySignedIn: false});
          this.formView = 'login';

          this.loading = false;
        },
        error: (error) => {
          if (error instanceof HttpErrorResponse && error.status === 409) {
            this.errorMessage = 'The username is already in use.';
            this.registerForm.patchValue({email: ''});
          } else {
            this.errorMessage = 'An error occurred. Try again.';
          }

          this.registerForm.patchValue({password: '', passwordCheck: ''});
          this.submitted = false;
          this.loading = false;
        }
      });
  }

  getUser(): void {
    this.authApiService.getCurrentUser().pipe(takeUntil(this.destroy$)).subscribe({
      next: (user) => {
        this.loading = false;

        this.appStore.updateUser(user);
      }
    })
  }

  switchFormView(): void {
    this.submitted = false;
    this.loginForm.reset();
    this.registerForm.reset();
    this.errorMessage = undefined;

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
    return this.submitted && control?.invalid!;
  }
}
