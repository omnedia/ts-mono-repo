import { HttpErrorResponse } from '@angular/common/http';
import type { OnInit } from '@angular/core';
import { Component, computed, DestroyRef, effect, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { email, form, FormField, required } from '@angular/forms/signals';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonDirective } from 'primeng/button';
import { Checkbox } from 'primeng/checkbox';
import { InputText } from 'primeng/inputtext';
import { PasswordDirective } from 'primeng/password';
import { AuthenticationService } from '../api';
import { RoutingService } from '../services/routing.service';
import { AppStore } from '../stores/app.store';
import type { LoginFormData, RegisterFormData } from '../types/form.types';

@Component({
  selector: 'app-auth',
  imports: [
    ReactiveFormsModule,
    Checkbox,
    FormField,
    InputText,
    PasswordDirective,
    ButtonDirective,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  standalone: true,
})
export class AuthComponent implements OnInit {
  private readonly authenticationService = inject(AuthenticationService);
  private readonly appStore = inject(AppStore);
  private readonly routingService = inject(RoutingService);
  private readonly destroyRef = inject(DestroyRef);

  formView = signal<'login' | 'register'>('login');

  loginModel = signal<LoginFormData>({
    email: '',
    password: '',
    staySignedIn: false,
  });

  registerModel = signal<RegisterFormData>({
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

  hasFormError(fieldName: keyof LoginFormData): ReturnType<typeof computed<boolean>>;
  hasFormError(fieldName: keyof RegisterFormData): ReturnType<typeof computed<boolean>>;
  hasFormError(fieldName: keyof LoginFormData | keyof RegisterFormData) {
    return computed(() => {
      if (this.formView() === 'login') {
        const field = this.loginForm[fieldName as keyof LoginFormData];
        return !!field && this.submitted() && field().invalid();
      } else {
        const field = this.registerForm[fieldName as keyof RegisterFormData];
        return !!field && this.submitted() && field().invalid();
      }
    });
  }

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

    this.authenticationService
      .login({ email, password, staySignedIn })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.getCsrf();
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

    this.authenticationService
      .register({ email, password })
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
    this.authenticationService
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
    const doSwitch = () => {
      this.submitted.set(false);
      this.loginForm().reset({ email: '', password: '', staySignedIn: false });
      this.registerForm().reset({ email: '', password: '', passwordCheck: '' });
      this.errorMessage.set(undefined);

      this.formView.set(this.formView() === 'login' ? 'register' : 'login');
    };

    const doc = document as Document;

    if (typeof doc.startViewTransition !== 'function') {
      doSwitch();
      return;
    }

    doc.startViewTransition(doSwitch);
  }

  private getCsrf() {
    this.authenticationService
      .getCsrf()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.appStore.updateCsrfToken(response['csrfToken']);

          this.loginForm().reset();
          this.submitted.set(false);
          this.errorMessage.set(undefined);

          this.getUser();
        },
        error: () => {
          this.loginForm.password().reset('');
          this.errorMessage.set('Failed to get csrf token.');
          this.submitted.set(false);
          this.loading.set(false);
        },
      });
  }
}
