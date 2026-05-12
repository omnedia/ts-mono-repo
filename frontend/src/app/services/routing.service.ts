import { inject, Injectable } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { AppStore } from '../stores/app.store';

type NavigationCallback = (success: boolean) => void;

@Injectable({
  providedIn: 'root',
})
export class RoutingService {
  private readonly router = inject(Router);
  private readonly appStore = inject(AppStore);

  private timer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.timer = setTimeout(() => {
          this.appStore.updateNavigating(true);
        }, 150);
      }

      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        if (this.timer) clearTimeout(this.timer);
        this.appStore.updateNavigating(false);
      }

      if (event instanceof NavigationEnd) {
        const currentPath = event.urlAfterRedirects;

        this.appStore.updateLastUrl(this.appStore.currentUrl());
        this.appStore.updateCurrentUrl(currentPath);
      }
    });
  }

  lastUrl(callback?: NavigationCallback): void {
    const lastUrl = this.appStore.lastUrl();

    if (!lastUrl) {
      this.home(callback);
      return;
    }

    void this.router.navigateByUrl(lastUrl).then(callback);
  }

  home(callback?: NavigationCallback): void {
    this.navigate(['/'], callback);
  }

  auth(callback?: NavigationCallback): void {
    this.navigate(['/auth'], callback);
  }

  notFound(callback?: NavigationCallback): void {
    this.navigate(['/not-found'], callback);
  }

  private navigate(commands: string[], callback?: NavigationCallback): void {
    void this.router.navigate(commands).then(callback);
  }
}
