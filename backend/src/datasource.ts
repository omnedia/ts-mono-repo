import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT ?? '5432', 10) || 5432,
    username: process.env.POSTGRES_USER || 'admin',
    password: process.env.POSTGRES_PASSWORD || 'root',
    database: process.env.POSTGRES_DB || 'app',
    entities: [__dirname + '/entities/*.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
    synchronize: false,
    logging: true,
});