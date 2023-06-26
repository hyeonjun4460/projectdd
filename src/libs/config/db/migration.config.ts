import { DataSource, DataSourceOptions } from 'typeorm';
import { databaseConfigOptions } from '@libs/config/db/database.config';

export const migrationConfigOption: DataSource = new DataSource(
  databaseConfigOptions as DataSourceOptions,
);
