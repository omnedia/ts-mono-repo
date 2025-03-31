import {Injectable} from '@angular/core';
import {ComponentStore} from '@ngrx/component-store';
import {IUser} from '@shared/interfaces';
import {tap} from 'rxjs';

export type Theme = 'light' | 'dark';

export type AppState = {
  user?: IUser;
  loading: boolean;
  theme: Theme;
};

const defaultState: AppState = {
  user: undefined,
  loading: false,
  theme: 'light',
};

@Injectable({providedIn: 'root'})
export class AppStore extends ComponentStore<AppState> {
  constructor() {
    super(defaultState);
    this.initTheme();
  }

  readonly user$ = this.select(({user}) => user);

  readonly updateUser = this.updater((state, user: IUser | undefined) => ({
    ...state,
    user: user,
  }));

  readonly loading$ = this.select(({loading}) => loading);

  readonly updateLoading = this.updater((state, loading: boolean) => ({
    ...state,
    loading: loading,
  }));

  readonly theme$ = this.select(({theme}) => theme);

  readonly setTheme = this.updater((state, theme: Theme) => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    return {...state, theme};
  });

  readonly toggleTheme = this.updater((state) => {
    const newTheme: Theme = state.theme === 'light' ? 'dark' : 'light';
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    return {...state, theme: newTheme};
  });

  readonly initTheme = this.effect((origin$) =>
    origin$.pipe(
      tap(() => {
        const saved = localStorage.getItem('theme') as Theme | null;
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme: Theme = saved ?? (systemPrefersDark ? 'dark' : 'light');

        this.setTheme(theme);
      })
    )
  );

}
