import {ApplicationConfig, provideZonelessChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimations} from '@angular/platform-browser/animations';
import {tokenInterceptor} from './interceptors/token.interceptor';
import {provideHttpClient, withInterceptors, withJsonpSupport} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withJsonpSupport(), withInterceptors([tokenInterceptor])),
    provideAnimations(),
  ]
};
