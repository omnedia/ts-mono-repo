import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ComponentStore } from '@ngrx/component-store';
import type { IUser } from '@shared/interfaces';

export type Theme = 'light' | 'dark';

export interface AppState {
  user?: IUser;
  loading: boolean;
  lastUrl?: string;
  currentUrl?: string;
}

const defaultState: AppState = {
  user: undefined,
  loading: false,
  lastUrl: undefined,
  currentUrl: undefined,
};

@Injectable({ providedIn: 'root' })
export class AppStore extends ComponentStore<AppState> {
  constructor() {
    super(defaultState);
  }

  readonly user$ = this.select(({ user }) => user);
  readonly user = toSignal(this.user$);

  readonly updateUser = this.updater((state, user: IUser | undefined) => ({
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
}
