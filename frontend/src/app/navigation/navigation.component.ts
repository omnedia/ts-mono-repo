import { Component } from '@angular/core';
import { NgxThemeToggleComponent } from '@omnedia/ngx-theme-toggle';

@Component({
  selector: 'app-navigation',
  imports: [NgxThemeToggleComponent],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  standalone: true,
})
export class NavigationComponent {
  logout(): void {
    localStorage.removeItem('refresh-token');
    localStorage.removeItem('token');
    window.location.href = '/auth';
  }
}
