import { computed, inject, Injectable, signal } from '@angular/core';
import type { Params, QueryParamsHandling } from '@angular/router';
import {
  ActivatedRoute,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { AppStore } from '../stores/app.store';

type NavigationCallback = (success: boolean) => void;

export interface UpdateUrlStateOptions {
  fragment?: string | null;
  queryParams?: Params | null;
  queryParamsHandling?: QueryParamsHandling;
  replaceUrl?: boolean;
  callback?: NavigationCallback;
}

@Injectable({
  providedIn: 'root',
})
export class RoutingService {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly appStore = inject(AppStore);

  private timer: ReturnType<typeof setTimeout> | null = null;

  readonly anchor = signal<string | null>(null);
  readonly queryParams = signal<Params>({});
  readonly routeParams = signal<Params>({});

  readonly queryParam = (key: string) => computed(() => this.queryParams()[key] ?? null);

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

        let route = this.router.routerState.root;
        while (route.firstChild) {
          route = route.firstChild;
        }

        this.anchor.set(this.activatedRoute.snapshot.fragment);
        this.queryParams.set(this.activatedRoute.snapshot.queryParams);
        this.routeParams.set(route.snapshot.params);

        this.appStore.updateLastUrl(this.appStore.currentUrl());
        this.appStore.updateCurrentUrl(currentPath);
      }
    });
  }

  updateUrlState(options: UpdateUrlStateOptions): void {
    void this.router
      .navigate([], {
        fragment: options.fragment ?? undefined,
        queryParams: options.queryParams ?? undefined,
        queryParamsHandling: options.queryParamsHandling ?? 'merge',
        replaceUrl: options.replaceUrl ?? false,
      })
      .then(options.callback);
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
