import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate,} from '@angular/router';
import {map, Observable, take} from 'rxjs';
import {AppStore} from '../stores/app.store';
import {RoutingService} from '../services/routing.service';

@Injectable({providedIn: 'root'})
export class AuthRoleGuard implements CanActivate {
  constructor(
    private appStore: AppStore,
    private readonly routingService: RoutingService,
  ) {
  }

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
      })
    );
  }
}
