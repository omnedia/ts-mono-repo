import { effect, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ComponentStore } from '@ngrx/component-store';
import { tap } from 'rxjs';
import { User } from '../api';

export type Theme = 'light' | 'dark';

export interface AppState {
  user?: User | null;
  loading: boolean;
  navigating: boolean;
  lastUrl?: string;
  currentUrl?: string;
  csrfToken?: string;
  theme: Theme;
}

const defaultState: AppState = {
  user: undefined,
  loading: false,
  navigating: false,
  lastUrl: undefined,
  currentUrl: undefined,
  csrfToken: undefined,
  theme: 'light',
};

@Injectable({ providedIn: 'root' })
export class AppStore extends ComponentStore<AppState> {
  constructor() {
    super(defaultState);

    this.initTheme();

    effect(() => {
      const theme = this.theme() ?? 'light';
      const root = document.documentElement;
      root.classList.remove('dark', 'light');
      root.classList.add(theme);
    });
  }

  readonly csrfToken$ = this.select(({ csrfToken }) => csrfToken);
  readonly csrfToken = toSignal(this.csrfToken$);

  readonly updateCsrfToken = this.updater((state, csrfToken: string | undefined) => ({
    ...state,
    csrfToken: csrfToken,
  }));

  readonly user$ = this.select(({ user }) => user);
  readonly user = toSignal(this.user$);

  readonly updateUser = this.updater((state, user: User | undefined | null) => ({
    ...state,
    user: user,
  }));

  readonly hasRole$ = (role: string) => this.select(({ user }) => user?.role === role);
  readonly hasRole = (role: string) => toSignal(this.hasRole$(role), { initialValue: false });

  readonly isAdmin$ = this.select(({ user }) => user?.role === 'admin');
  readonly isAdmin = toSignal(this.isAdmin$);

  readonly loading$ = this.select(({ loading }) => loading);
  readonly loading = toSignal(this.loading$);

  readonly updateLoading = this.updater((state, loading: boolean) => ({
    ...state,
    loading: loading,
  }));

  readonly navigating$ = this.select(({ navigating }) => navigating);
  readonly navigating = toSignal(this.navigating$);

  readonly updateNavigating = this.updater((state, navigating: boolean) => ({
    ...state,
    navigating: navigating,
  }));

  readonly lastUrl$ = this.select(({ lastUrl }) => lastUrl);
  readonly lastUrl = toSignal(this.lastUrl$);

  readonly updateLastUrl = this.updater((state, lastUrl?: string) => ({
    ...state,
    lastUrl: lastUrl,
  }));

  readonly currentUrl$ = this.select(({ currentUrl }) => currentUrl);
  readonly currentUrl = toSignal(this.currentUrl$);

  readonly updateCurrentUrl = this.updater((state, currentUrl?: string) => ({
    ...state,
    currentUrl: currentUrl,
  }));

  readonly theme$ = this.select(({ theme }) => theme);
  readonly theme = toSignal(this.theme$);
  readonly setTheme = this.updater((state, theme: Theme) => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    return { ...state, theme };
  });
  readonly toggleTheme = this.updater((state) => {
    const newTheme: Theme = state.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    return { ...state, theme: newTheme };
  });

  readonly initTheme = this.effect((origin$) =>
    origin$.pipe(
      tap(() => {
        const saved = localStorage.getItem('theme') as Theme | null;
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme: Theme = saved ?? (systemPrefersDark ? 'dark' : 'light');

        this.setTheme(theme);
      }),
    ),
  );
}
