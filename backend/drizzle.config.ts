import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  out: './src/migrations',
  schema: './src/entities/**/*.schema.ts',
  dbCredentials: {
    url: `postgresql://${process.env.POSTGRES_USER || 'admin'}:${process.env.POSTGRES_PASSWORD || 'root'}@${process.env.POSTGRES_HOST || 'localhost'}:${process.env.POSTGRES_PORT || 5432}/${process.env.POSTGRES_DB || 'app'}`,
  },
  strict: true,
  verbose: true,
  migrations: {
    table: '__migrations',
    schema: 'public',
  },
});
