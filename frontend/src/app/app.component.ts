import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MessageService} from 'primeng/api';
import {AppStore} from './stores/app.store';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {AuthApiService} from './services/auth-api.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  providers: [MessageService]
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private readonly authApiService: AuthApiService,
    private readonly appStore: AppStore,
  ) {
  }

  ngOnInit(): void {
    this.authApiService.getCurrentUser().pipe(takeUntil(this.destroy$)).subscribe({
      next: (user) => {
        this.appStore.updateUser(user);
      }
    });
  }

  destroy$ = new Subject<void>()

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
