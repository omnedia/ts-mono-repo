import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../entities/user/user.schema';

export type Database = NodePgDatabase<typeof schema>;

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  readonly db: Database;

  private readonly pool: Pool;

  constructor(configService: ConfigService) {
    this.pool = new Pool({
      host: configService.get<string>('POSTGRES_HOST') || 'localhost',
      port: Number(configService.get<string>('POSTGRES_PORT') || 5432),
      user: configService.get<string>('POSTGRES_USER') || 'admin',
      password: configService.get<string>('POSTGRES_PASSWORD') || 'root',
      database: configService.get<string>('POSTGRES_DB') || 'app',
    });

    this.db = drizzle(this.pool, { schema });
  }

  async onModuleDestroy(): Promise<void> {
    await this.pool.end();
  }
}
