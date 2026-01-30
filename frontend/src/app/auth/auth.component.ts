import { HttpErrorResponse } from '@angular/common/http';
import type { OnInit } from '@angular/core';
import { Component, computed, DestroyRef, effect, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { email, form, FormField, required } from '@angular/forms/signals';
import { ProgressSpinner } from 'primeng/progressspinner';
import { AuthApiService } from '../services/auth-api.service';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Checkbox } from 'primeng/checkbox';
import { RoutingService } from '../services/routing.service';
import { AppStore } from '../stores/app.store';
import type { LoginData, RegisterData } from '../types/form.types';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule, ProgressSpinner, Checkbox, FormField],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  standalone: true,
})
export class AuthComponent implements OnInit {
  formView = signal<'login' | 'register'>('login');

  loginModel = signal<LoginData>({
    email: '',
    password: '',
    staySignedIn: false,
  });

  registerModel = signal<RegisterData>({
    email: '',
    password: '',
    passwordCheck: '',
  });

  loginForm = form(this.loginModel, (schema) => {
    required(schema.email);
    email(schema.email);
    required(schema.password);
  });
  registerForm = form(this.registerModel, (schema) => {
    required(schema.email);
    email(schema.email);
    required(schema.password);
    required(schema.passwordCheck);
  });

  submitted = signal<boolean>(false);
  errorMessage = signal<string | undefined>(undefined);

  loading = signal<boolean>(false);

  hasFormError(fieldName: keyof LoginData): ReturnType<typeof computed<boolean>>;
  hasFormError(fieldName: keyof RegisterData): ReturnType<typeof computed<boolean>>;
  hasFormError(fieldName: keyof LoginData | keyof RegisterData) {
    return computed(() => {
      if (this.formView() === 'login') {
        const field = this.loginForm[fieldName as keyof LoginData];
        return !!field && this.submitted() && field().invalid();
      } else {
        const field = this.registerForm[fieldName as keyof RegisterData];
        return !!field && this.submitted() && field().invalid();
      }
    });
  }

  private readonly authApiService = inject(AuthApiService);
  private readonly appStore = inject(AppStore);
  private readonly routingService = inject(RoutingService);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    effect(() => {
      const user = this.appStore.user();

      if (user) {
        this.routingService.home();
      }
    });
  }

  ngOnInit() {
    const theme = localStorage.getItem('theme');
    if (theme === 'light' || theme === 'dark') {
      document.documentElement.classList.add(theme);
    }

    this.getUser();
  }

  login(event: Event): void {
    event.preventDefault();

    this.submitted.set(true);

    if (this.loginForm().invalid()) return;

    const { email, password, staySignedIn } = this.loginForm().value();

    this.loading.set(true);

    this.authApiService
      .login(email, password, staySignedIn)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          if (staySignedIn && response.refresh_token) {
            localStorage.setItem('refresh-token', response.refresh_token);
          }

          localStorage.setItem('token', response.access_token);

          this.loginForm().reset();
          this.submitted.set(false);
          this.errorMessage.set(undefined);

          this.getUser();
        },
        error: () => {
          this.loginForm.password().reset('');
          this.errorMessage.set('Invalid username or password');
          this.submitted.set(false);
          this.loading.set(false);
        },
      });
  }

  register(event: Event): void {
    event.preventDefault();

    this.submitted.set(true);

    if (this.registerForm().invalid()) return;

    const { email, password, passwordCheck } = this.registerForm().value();

    if (password !== passwordCheck) {
      this.errorMessage.set('The Password and Password-Check must be equal.');
      this.registerForm().reset({
        email: email,
        password: '',
        passwordCheck: '',
      });
      return;
    }

    this.loading.set(true);

    this.authApiService
      .register(email, password)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.registerForm().reset();
          this.submitted.set(false);
          this.errorMessage.set(undefined);

          this.loginForm().reset({ email: email, password: '', staySignedIn: false });
          this.formView.set('login');

          this.loading.set(false);
        },
        error: (error) => {
          this.submitted.set(false);
          this.loading.set(false);

          if (error instanceof HttpErrorResponse && error.status === 409) {
            this.errorMessage.set('The username is already in use.');
            this.registerForm().reset({ email: '', password: '', passwordCheck: '' });
          } else {
            this.errorMessage.set('An error occurred. Try again.');
            this.registerForm().reset({ email: email, password: '', passwordCheck: '' });
          }
        },
      });
  }

  getUser(): void {
    this.authApiService
      .getCurrentUser()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (user) => {
          this.loading.set(false);

          this.appStore.updateUser(user);
        },
      });
  }

  switchFormView(): void {
    this.submitted.set(false);
    this.loginForm().reset({ email: '', password: '', staySignedIn: false });
    this.registerForm().reset({ email: '', password: '', passwordCheck: '' });
    this.errorMessage.set(undefined);

    if (this.formView() === 'login') {
      this.formView.set('register');
    } else {
      this.formView.set('login');
    }
  }
}
