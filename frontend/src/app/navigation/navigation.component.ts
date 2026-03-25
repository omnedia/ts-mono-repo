import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from '../api';
import { AppStore } from '../stores/app.store';

@Component({
  selector: 'app-navigation',
  imports: [],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  standalone: true,
})
export class NavigationComponent {
  appStore = inject(AppStore);
  private readonly authenticationService = inject(AuthenticationService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly messageService = inject(MessageService);

  logout(): void {
    this.appStore.updateLoading(true);

    this.authenticationService
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
