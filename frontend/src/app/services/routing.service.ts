import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AppStore} from '../stores/app.store';

@Injectable({
  providedIn: 'root',
})
export class RoutingService {
  constructor(
    private readonly router: Router,
    private readonly appStore: AppStore,
  ) {
  }

  auth(): void {
    this.preRouting();
    this.router.navigate(['/auth']).then(() => this.postRouting());
  }

  home(): void {
    this.preRouting();
    this.router.navigate(['/home']).then(() => this.postRouting());
  }

  notFound() {
    this.preRouting();
    this.router.navigate(['/not-found']).then(() => this.postRouting());
  }

  private preRouting(): void {
    this.appStore.updateLoading(true);
  }

  private postRouting(): void {
    this.appStore.updateLoading(false);
  }
}
