import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const source = new DataSource({
  type: 'postgres',
  host: 'colloq-db',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  synchronize: true,
  logging: false,
  entities: [__dirname + '/entities/**/*.{js,ts}'],
});
