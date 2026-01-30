import { inject, Injectable } from '@angular/core';
import type { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import type { Observable } from 'rxjs';
import { map, take } from 'rxjs';
import { RoutingService } from '../services/routing.service';
import { AppStore } from '../stores/app.store';

@Injectable({ providedIn: 'root' })
export class AuthRoleGuard implements CanActivate {
  private appStore = inject(AppStore);
  private readonly routingService = inject(RoutingService);

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const requiredRoles = route.data['roles'] as string[] | undefined;

    return this.appStore.user$.pipe(
      take(1),
      map((user) => {
        if (!user) {
          this.routingService.auth();
          return false;
        }

        if (!requiredRoles || requiredRoles.includes(user.role)) {
          return true;
        }

        this.routingService.notFound();
        return false;
      }),
    );
  }
}
