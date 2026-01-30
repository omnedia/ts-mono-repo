import { Component, computed, DestroyRef, inject, type OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import { NavigationComponent } from './navigation/navigation.component';
import { AuthApiService } from './services/auth-api.service';
import { AppStore } from './stores/app.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  providers: [MessageService],
})
export class AppComponent implements OnInit {
  private readonly authApiService = inject(AuthApiService);
  private readonly appStore = inject(AppStore);
  private readonly destroyRef = inject(DestroyRef);

  showNavigation = computed(() => {
    const loggedIn = !!this.appStore.user();
    const route = this.appStore.currentUrl();

    return loggedIn && !route?.startsWith('/auth');
  });

  ngOnInit(): void {
    this.authApiService
      .getCurrentUser()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (user) => {
          this.appStore.updateUser(user);
        },
      });
  }
}
