import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const mySqlOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: /true/i.test(process.env.MYSQL_SYNCHRONIZE),
  logging: /true/i.test(process.env.MYSQL_LOGGING),
  migrationsRun: /true/i.test(process.env.MYSQL_MIGRATIONSRUN),
  autoLoadEntities: true,
  entities: ['dist/app/entity/**/*.js'],
  migrations: ['dist/app/migration/**/*.js'],
  subscribers: ['dist/app/subscriber/**/*.js'],
};

export const MySQLDataSource = new DataSource(
  mySqlOptions as DataSourceOptions,
);
