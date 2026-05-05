# 🧱 TS Monorepo Starter (NestJS + Angular 21 + PostgreSQL)

A full-stack monorepo boilerplate built with:

- **Angular 21** (with PrimeNG + Auth skeleton + View Transitions + ng-openapi)
- **NestJS** (with Swagger + Session-based Auth + CSRF protection)
- **PostgreSQL** (via Docker Compose)
- **Redis** (optional, for session storage)
- **Husky** for Git hooks and automated linting/formatting
- **GitHub Copilot** context and coding guidelines

---

## 🗂️ Project Structure

```
.
├── .github       # Copilot context and coding guidelines
├── .husky        # Git hooks (pre-commit linting & formatting)
├── backend       # NestJS API with Swagger & Session-based auth
├── frontend      # Angular app with PrimeNG & auth setup
├── postgres      # PostgreSQL via Docker Compose
├── redis         # Redis via Docker Compose (optional, for session storage)
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repo

```
git clone https://github.com/omnedia/ts-mono-repo.git
cd ts-mono-repo
```

---

## ⚙️ Setup Instructions

### 📦 Backend

```
cd backend
npm install
npm run migration:run // After the db is up and running
```

#### Start the backend

```
npm run start:dev
```

#### Swagger available at:

```
http://localhost:3800/api
```

#### 🔐 Session-based Auth & CSRF Protection

Session-based authentication with CSRF protection is preconfigured:

- **Session cookies** for authentication (httpOnly, secure in production)
- **Double-submit CSRF tokens** to prevent CSRF attacks
- **Redis support** (optional) for session storage in production
- **LocalAuthGuard** for email/password login
- **SessionAuthGuard** for protected routes
- **RolesGuard** for role-based access control

#### CSRF Token Flow

1. Frontend requests a CSRF token from `/auth/csrf`
2. Token is stored in a cookie and returned in the response
3. Frontend includes the token in the `x-csrf-token` header for state-changing requests
4. Backend validates the token before processing the request

Excluded routes (no CSRF validation):

- `POST /auth/login`
- `POST /auth/register`
- `GET /auth/csrf`

#### 🧹 Linting & Formatting

ESLint and Prettier are preconfigured for code quality and consistency.

```bash
npm run lint           # Check for linting errors
npm run lint:fix       # Fix linting errors automatically
npm run format         # Check formatting
npm run format:fix     # Fix formatting automatically
npm run check          # Run both lint and format checks
```

---

### 🧪 Backend Environment Config

Create a `.env` file in the `backend` directory:

```
NODE_ENV=dev
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=admin
POSTGRES_PASSWORD=root
POSTGRES_DB=app
CSRF_SECRET=your_csrf_secret
SESSION_SECRET=your_session_secret
SESSION_EXPIRATION=1h
SESSION_STAY_SIGNED_IN_EXPIRATION=7d
PORT=3800
SESSION_COOKIE_DOMAIN= .app.com # remove for dev / replace with own domain in prod
FRONTEND_URL=http://localhost:4200
ALLOWED_ORIGINS=http://localhost:4200
REDIS_URL=redis://localhost:6379  # Optional: for production session storage
```

**Important:**

- `SESSION_SECRET` should be a strong random string (at least 32 characters)
- `REDIS_URL` is optional. If not set, sessions will be stored in memory (not recommended for production)
- In production, ensure sessions are stored in Redis or another persistent store

---

### 🧑‍🎨 Frontend

```
cd frontend
npm install
```

#### Start the frontend

```
ng serve
```

#### 🌐 App available at:

```
http://localhost:4200
```

### 💅 PrimeNG

PrimeNG components are preconfigured.

### 🎬 View Transitions

The Angular app uses the **View Transitions API** for smooth animations between routes and component states.

#### ✅ Features

- Configured via `withViewTransitions()` in the router
- Custom animations defined in `view-transitions.scss`
- Smooth fade-in/fade-out transitions for route changes
- Supports named view transitions for specific components (e.g., `auth-panel`)

#### 🛠 How It Works

- View transitions are enabled in `app.config.ts` with `provideRouter(routes, withViewTransitions())`
- CSS animations are defined using `::view-transition-old()` and `::view-transition-new()` pseudo-elements
- Different transition durations and styles can be applied to different parts of the app

### 🎨 Frontend Theme Support

The Angular app supports **light and dark mode switching** using CSS variables and state managed by the `AppStore` (NgRx
ComponentStore).

#### ✅ Theme Features

- Light/dark mode based on system preference or user choice
- Theme preference saved to `localStorage`
- Reactive theme switching via `AppStore`
- Automatic class updates on the `<html>` element

#### 🛠 How It Works

- CSS variables are defined in `:root` (light theme) and `.dark` class (dark theme) in your global styles
- The `AppStore` manages the current theme and persists it to `localStorage`
- On app start, the system preference is used unless a saved value is found
- An effect in the store automatically updates the `<html>` element with the correct theme class

---

### 🧹 Frontend Linting & Formatting

ESLint and Prettier are preconfigured for code quality and consistency.

```bash
npm run lint           # Check for linting errors
npm run lint:fix       # Fix linting errors automatically
npm run format         # Check formatting
npm run format:fix     # Fix formatting automatically
npm run check          # Run both lint and format checks
```

---

### 🔐 Frontend Auth Guard

You can add an AuthRoleGuard to your frontend routes like this:

```ts
{
  path: 'home',
    loadComponent
:
  () => import('./home/home.component').then(
    (m) => m.HomeComponent,
  ),
    canActivate
:
  [AuthRoleGuard],
    roles
:
  ['user', 'admin']
}
,
```

### 🌍 Frontend Environment Config

Create `src/environments/environment.ts` in `frontend`:

```ts
export const environment: Environment = {
  apiUrl: 'http://localhost:3800',
};
```

---

### 🔄 API Client Generation with ng-openapi

The frontend uses **ng-openapi-gen** to automatically generate TypeScript API clients from the NestJS Swagger/OpenAPI
specification.

#### ✅ Features

- Type-safe API client generated from Swagger spec
- Models, services, and request builders auto-generated
- No need to manually maintain API service code
- Full TypeScript support with auto-completion

#### 🛠 How to Use

1. Start the backend server (Swagger must be available at `http://localhost:3800/api-json`)
2. Run the generation command from the backend directory:

```bash
cd backend
npm run api:generate
```

This will generate the API client code in `frontend/src/app/api/`

**Note:** The generated code should not be manually edited. Re-run the command whenever the backend API changes.

---

### 🐘 PostgreSQL

#### Setup with Docker Compose

```
cd postgres
docker-compose up -d
```

---

### 🛠️ Postgres Environment

Create/edit `.env` in `postgres` folder:

```
POSTGRES_USER=admin
POSTGRES_PASSWORD=root
POSTGRES_DB=app
```

---

### 🔴 Redis (Optional)

Redis can be used for session storage in production environments.

#### Setup with Docker Compose

```
cd redis
docker-compose up -d
```

**Note:** Redis is optional. If `REDIS_URL` is not set in the backend `.env`, sessions will be stored in memory (
suitable for development only).

---

## ✅ Features

- 🔐 Session-based authentication with CSRF protection
- 🐘 PostgreSQL + TypeORM
- 🔴 Redis support for session storage (optional)
- 📑 Swagger API docs
- 💄 PrimeNG in Angular
- 🎬 View Transitions API for smooth animations
- 🎨 Light/Dark theme support (AppStore-based)
- 🔄 Auto-generated API client with ng-openapi
- 🪝 Husky Git hooks for automated linting and formatting
- 🤖 GitHub Copilot context and coding guidelines

---

## 🧪 Development Tips

- Always run `docker-compose up` before starting backend if DB is down
- Sync `.env` values between backend and docker DB config
- Make sure `environment.ts` matches backend URLs
- Run `npm run api:generate` from backend after API changes to update frontend client
- Pre-commit hooks will automatically lint and format your code via Husky
- Check `.github/copilot-instructions.md` for AI-assisted development guidelines
