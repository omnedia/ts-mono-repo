import type { ApplicationConfig } from '@angular/core';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptors, withJsonpSupport } from '@angular/common/http';
import { routes } from './app.routes';
import { tokenInterceptor } from './interceptors/token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withJsonpSupport(), withInterceptors([tokenInterceptor])),
  ],
};
