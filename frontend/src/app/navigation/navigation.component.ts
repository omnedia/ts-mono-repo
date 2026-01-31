import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgxThemeToggleComponent } from '@omnedia/ngx-theme-toggle';
import { MessageService } from 'primeng/api';
import { AuthApiService } from '../services/auth-api.service';
import { AppStore } from '../stores/app.store';

@Component({
  selector: 'app-navigation',
  imports: [NgxThemeToggleComponent],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  standalone: true,
})
export class NavigationComponent {
  appStore = inject(AppStore);
  authApiService = inject(AuthApiService);
  destroyRef = inject(DestroyRef);
  messageService = inject(MessageService);

  logout(): void {
    this.appStore.updateLoading(true);

    this.authApiService
      .logout()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.appStore.updateCsrfToken(undefined);
          this.appStore.updateUser(undefined);
          this.appStore.updateLoading(false);
          window.location.href = '/auth';
        },
        error: () => {
          this.appStore.updateLoading(false);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Logout failed. Try again.',
          });
        },
      });
  }
}
