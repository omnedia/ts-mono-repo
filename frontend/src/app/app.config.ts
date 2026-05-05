import type { ApplicationConfig } from '@angular/core';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { provideHttpClient, withInterceptors, withJsonpSupport } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import { environment } from '../environments/environment';
import { CustomPreset } from '../theme/custom.preset';
import { provideDefaultClient } from './api';
import { routes } from './app.routes';
import { csrfInterceptor } from './interceptors/csrf.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(withJsonpSupport(), withInterceptors([csrfInterceptor])),
    provideDefaultClient({ basePath: environment.apiUrl }),
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
  ],
};
