import type { Route } from '@angular/router';

export interface CustomRouteTypes extends Route {
  roles?: string[];
}
