import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimations} from '@angular/platform-browser/animations';
import {tokenInterceptor} from './interceptors/token.interceptor';
import {provideHttpClient, withInterceptors, withJsonpSupport} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(withJsonpSupport(), withInterceptors([tokenInterceptor])),
    provideAnimations(),
  ]
};
