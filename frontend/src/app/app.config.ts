import type { ApplicationConfig } from '@angular/core';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { provideHttpClient, withInterceptors, withJsonpSupport } from '@angular/common/http';
import { environment } from '../environments/environment';
import { provideDefaultClient } from './api';
import { routes } from './app.routes';
import { csrfInterceptor } from './interceptors/csrf.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(withJsonpSupport(), withInterceptors([csrfInterceptor])),
    provideDefaultClient({ basePath: environment.apiUrl }),
  ],
};
