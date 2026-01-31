import { inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AppStore } from '../stores/app.store';

@Injectable({
  providedIn: 'root',
})
export class RoutingService {
  private readonly router = inject(Router);
  private readonly appStore = inject(AppStore);

  constructor() {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        const currentPath = e.urlAfterRedirects;

        this.appStore.updateLastUrl(this.appStore.currentUrl());
        this.appStore.updateCurrentUrl(currentPath);
      });
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
    this.appStore.updateNavigating(true);
  }

  private postRouting(): void {
    this.appStore.updateNavigating(false);
  }
}
