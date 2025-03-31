# 🧱 TS Monorepo Starter (NestJS + Angular + PostgreSQL)

A full-stack monorepo boilerplate built with:

- **Angular** (with PrimeNG + Auth skeleton)
- **NestJS** (with Swagger + JWT Auth setup)
- **PostgreSQL** (via Docker Compose)
- **Shared** module for common types/interfaces

---

## 🗂️ Project Structure

```
.
├── backend       # NestJS API with Swagger & JWT auth
├── frontend      # Angular app with PrimeNG & auth setup
├── postgres      # PostgreSQL via Docker Compose
├── shared        # Shared interfaces/types between frontend & backend
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

#### 🔐 JWT Auth

Basic JWT auth is preconfigured.

---

### 🧪 Backend Environment Config

Create a `.env` file in the `backend` directory:

```
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=admin
POSTGRES_PASSWORD=root
POSTGRES_DB=app
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
JWT_EXPIRATION=1h
JWT_REFRESH_EXPIRATION=7d
PORT=3800
ALLOWED_ORIGINS=http://localhost:4200
```

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

### 🎨 Frontend Theme Support

The Angular app supports **light and dark mode switching** using CSS variables and a global state managed by
`@ngrx/component-store`.

#### ✅ Theme Features

- Light/dark mode based on system preference or user choice
- Theme preference saved to `localStorage`
- Reactive switching via a central `AppStore`

#### 🛠 How It Works

- CSS variables are defined in `:root` (light theme) and `[data-theme="dark"]` (dark theme) in your global styles
- The `AppStore` manages the current theme and persists it
- On app start, the system preference is used unless a saved value is found
- You can toggle theme in any component via `appStore.toggleTheme()`

#### 🧩 Example Usage

In `app.component.html`:

```html

<button (click)="appStore.toggleTheme()">
    Switch to {{ appStore.theme$ | async === 'light' ? 'Dark' : 'Light' }} Mode
</button>
```

You can access the theme state and toggle logic via dependency injection:

```ts
constructor(public appStore: AppStore)
{
}
```

The body tag will automatically be updated with the correct `data-theme` attribute for styling.

---

### 🌍 Frontend Environment Config

Create `src/environments/environment.ts` in `frontend`:

```ts
export const environment: Environment = {
    apiUrl: 'http://localhost:3800',
    apiPoints: {
        authRegister: '/auth/register',
        authLogin: '/auth/login',
        authRefresh: '/auth/refresh',
        authUser: '/auth/user',
        changePassword: '/auth/change-password',
    },
};
```

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

## 📦 Shared Module

Use the `shared` directory to store common interfaces, DTOs, or utilities used across `frontend` and `backend`.

Path aliases in both projects to easily import shared resources are already added.

---

## ✅ Features

- 🔐 JWT-based authentication
- 🐘 PostgreSQL + TypeORM
- 📑 Swagger API docs
- 💄 PrimeNG in Angular
- 📦 Shared folder for type safety

---

## 🧪 Development Tips

- Always run `docker-compose up` before starting backend if DB is down
- Sync `.env` values between backend and docker DB config
- Make sure `environment.ts` matches backend URLs