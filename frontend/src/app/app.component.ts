import { Component, computed, DestroyRef, inject, type OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProgressBar } from 'primeng/progressbar';
import { ProgressSpinner } from 'primeng/progressspinner';
import { Toast } from 'primeng/toast';
import { AuthenticationService } from './api';
import { NavigationComponent } from './navigation/navigation.component';
import { AppStore } from './stores/app.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationComponent, Toast, ProgressSpinner, ProgressBar],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  providers: [MessageService],
})
export class AppComponent implements OnInit {
  private readonly authenticationService = inject(AuthenticationService);
  private readonly appStore = inject(AppStore);
  private readonly destroyRef = inject(DestroyRef);

  showNavigation = computed(() => {
    const loggedIn = !!this.appStore.user();
    const route = this.appStore.currentUrl();

    return loggedIn && !route?.startsWith('/auth');
  });

  globalNavigating = this.appStore.navigating;
  globalLoading = this.appStore.loading;

  ngOnInit(): void {
    this.authenticationService
      .getCurrentUser()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (user) => {
          this.appStore.updateUser(user);
        },
      });
  }
}
