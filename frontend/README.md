# 🎨 Frontend (Angular 21)

This is the frontend application for the TS Monorepo project, built with [Angular](https://angular.dev/) version 21.

---

## ✨ Features

- **Angular 21** with standalone components
- **PrimeNG** component library
- **View Transitions API** for smooth animations
- **Light/Dark theme** support via AppStore (NgRx ComponentStore)
- **Session-based authentication** with CSRF protection
- **Role-based routing** with AuthRoleGuard
- **Type-safe API client** generated via ng-openapi
- **ESLint & Prettier** for code quality

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Create `src/environments/environment.ts`:

```typescript
import type { Environment } from './environment.type';

export const environment: Environment = {
  apiUrl: 'http://localhost:3800',
};
```

### 3. Start the development server

```bash
npm start
```

Or use Angular CLI directly:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will
automatically reload whenever you modify any of the source files.

---

## 🎨 Theme Support

The app supports **light and dark mode** switching using CSS variables and state managed by the `AppStore`.

### How it works

- CSS variables are defined in `:root` (light theme) and `.dark` class (dark theme)
- The `AppStore` manages the current theme and persists it to `localStorage`
- On app start, the system preference is used unless a saved value is found
- An effect in the store automatically updates the `<html>` element with the correct theme class

### Usage in components

```typescript
import { AppStore } from '@app/stores/app.store';

export class MyComponent {
  private readonly appStore = inject(AppStore);

  readonly theme = this.appStore.theme;

  toggleTheme() {
    const newTheme = this.theme() === 'light' ? 'dark' : 'light';
    this.appStore.setTheme(newTheme);
  }
}
```

---

## 🎬 View Transitions

The app uses the **View Transitions API** for smooth animations between routes.

### Features

- Configured via `withViewTransitions()` in the router
- Custom animations defined in `view-transitions.scss`
- Smooth fade-in/fade-out transitions for route changes
- Supports named view transitions for specific components (e.g., `auth-panel`)

### How it works

- View transitions are enabled in `app.config.ts` with `provideRouter(routes, withViewTransitions())`
- CSS animations are defined using `::view-transition-old()` and `::view-transition-new()` pseudo-elements
- Different transition durations and styles can be applied to different parts of the app

---

## 🔐 Authentication & Guards

### AuthRoleGuard

Protect routes based on user roles:

```typescript
{
  path: 'admin',
    loadComponent
:
  () => import('./admin/admin.component').then(m => m.AdminComponent),
    canActivate
:
  [AuthRoleGuard],
    data
:
  {
    roles: ['admin']
  }
}
```

### CSRF Protection

The app includes automatic CSRF token handling via an interceptor:

- Token is fetched from `/auth/csrf` on app initialization
- Token is stored in the `AppStore`
- The `CsrfInterceptor` automatically includes the token in the `x-csrf-token` header for state-changing requests

---

## 🔄 API Client Generation

The frontend uses **ng-openapi-gen** to automatically generate TypeScript API clients from the backend's Swagger/OpenAPI
specification.

### How to generate

1. Ensure the backend is running at `http://localhost:3800`
2. Run from the **backend** directory:

```bash
cd ../backend
npm run api:generate
```

This will generate the API client code in `frontend/src/app/api/`

### Usage

```typescript
import { AuthService } from '@app/api/services';

export class LoginComponent {
  private readonly authService = inject(AuthService);

  login(email: string, password: string) {
    return this.authService.authControllerLogin({body: {email, password}});
  }
}
```

**Note:** Never edit the generated code manually. Re-run `npm run api:generate` from the backend whenever the API
changes.

---

## 🧹 Code Quality

### Linting

```bash
npm run lint           # Check for linting errors
npm run lint:fix       # Fix linting errors automatically
```

### Formatting

```bash
npm run format         # Check formatting
npm run format:fix     # Fix formatting automatically
```

### Combined check

```bash
npm run check          # Run both lint and format checks
```

---

## 🔨 Code Scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`):

```bash
ng generate --help
```

---

## 🏗️ Building

To build the project for production:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build
optimizes your application for performance and speed.

---

## 🧪 Testing

### Unit tests

To execute unit tests with [Vitest](https://vitest.dev/):

```bash
npm run test
```

### End-to-end tests

For end-to-end (e2e) testing:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/              # Auto-generated API client (ng-openapi)
│   ├── auth/             # Authentication component
│   ├── guards/           # Route guards (AuthRoleGuard)
│   ├── interceptors/     # HTTP interceptors (CSRF)
│   ├── navigation/       # Navigation component
│   ├── services/         # Application services
│   ├── stores/           # State management (AppStore)
│   ├── types/            # TypeScript types
│   ├── app.component.*   # Root component
│   ├── app.config.ts     # Application configuration
│   └── app.routes.ts     # Route definitions
├── assets/               # Static assets
├── environments/         # Environment configurations
├── theme/                # SCSS theme files
├── index.html            # Main HTML file
├── main.ts               # Application entry point
└── styles.scss           # Global styles
```

---

## 📖 Additional Resources

- [Angular Documentation](https://angular.dev)
- [Angular CLI Command Reference](https://angular.dev/tools/cli)
- [PrimeNG Documentation](https://primeng.org)
- [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)

---

## 📝 License

This project is part of the TS Monorepo and follows the same license.
