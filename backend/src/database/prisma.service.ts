import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly configService: ConfigService) {
    super({
      datasources: {
        db: {
          url: PrismaService.getDatabaseUrl(configService),
        },
      },
    });
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }

  private static getDatabaseUrl(configService: ConfigService): string {
    const databaseUrl = configService.get<string>('DATABASE_URL');
    if (databaseUrl) {
      return databaseUrl;
    }

    const host = configService.getOrThrow<string>('POSTGRES_HOST');
    const port = configService.getOrThrow<number>('POSTGRES_PORT');
    const user = encodeURIComponent(configService.getOrThrow<string>('POSTGRES_USER'));
    const password = encodeURIComponent(configService.getOrThrow<string>('POSTGRES_PASSWORD'));
    const database = configService.getOrThrow<string>('POSTGRES_DB');

    return `postgresql://${user}:${password}@${host}:${port}/${database}`;
  }
}
