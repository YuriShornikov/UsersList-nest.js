import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Irregularlypostgres2024!',
  database: 'people',
  entities: ['dist/**/*.entity.js'],
  synchronize: false,
  migrations: [__dirname + '/migrations/*.js'],
});
