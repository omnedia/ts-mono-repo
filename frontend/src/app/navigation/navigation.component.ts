import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { AuthenticationService } from '../api';
import { RoutingService } from '../services/routing.service';
import { AppStore } from '../stores/app.store';

@Component({
  selector: 'app-navigation',
  imports: [Button],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  standalone: true,
})
export class NavigationComponent {
  readonly appStore = inject(AppStore);
  private readonly authenticationService = inject(AuthenticationService);
  private readonly messageService = inject(MessageService);
  private readonly routingService = inject(RoutingService);
  private readonly destroyRef = inject(DestroyRef);

  logout(): void {
    this.appStore.updateLoading(true);

    this.authenticationService
      .logout()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.routingService.auth(() => {
            this.appStore.updateCsrfToken(undefined);
            this.appStore.updateUser(null);
            this.appStore.updateLoading(false);
            window.location.href = '/auth';
          });
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
