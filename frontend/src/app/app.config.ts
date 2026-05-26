import type { ApplicationConfig } from '@angular/core';
import { inject, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import type { HttpInterceptorFn } from '@angular/common/http';
import { provideHttpClient, withInterceptors, withJsonpSupport } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import { DialogService } from 'primeng/dynamicdialog';
import { environment } from '../environments/environment';
import { CustomPreset } from '../theme/custom.preset';
import { DateInterceptor, provideDefaultClient } from './api';
import { routes } from './app.routes';
import { csrfInterceptor } from './interceptors/csrf.interceptor';

// TODO: Remove when Bug in ng-openapi is fixed
export const dateInterceptorFn: HttpInterceptorFn = (req, next) => {
  const interceptor = inject(DateInterceptor);

  return interceptor.intercept(req, {
    handle: next,
  });
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes, withViewTransitions()),
    DateInterceptor,
    provideHttpClient(withJsonpSupport(), withInterceptors([csrfInterceptor, dateInterceptorFn])),
    provideDefaultClient({ basePath: environment.apiUrl, enableDateTransform: true }),
    providePrimeNG({
      theme: {
        preset: CustomPreset,
        options: {
          darkModeSelector: '.dark',
        },
      },
      ripple: true,
    }),
    MessageService,
    DialogService,
  ],
};
