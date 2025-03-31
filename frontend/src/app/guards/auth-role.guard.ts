import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router,} from '@angular/router';
import {map, Observable, take} from 'rxjs';
import {AppStore} from '../stores/app.store';

@Injectable({providedIn: 'root'})
export class AuthRoleGuard implements CanActivate {
  constructor(private appStore: AppStore, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const requiredRoles = route.data['roles'] as string[] | undefined;

    return this.appStore.user$.pipe(
      take(1),
      map((user) => {
        if (!user) {
          this.router.navigate(['/auth']);
          return false;
        }

        if (!requiredRoles || requiredRoles.includes(user.role)) {
          return true;
        }

        this.router.navigate(['/not-found']);
        return false;
      })
    );
  }
}
