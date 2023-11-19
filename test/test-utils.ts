import { DataSource, DataSourceOptions } from 'typeorm';

export const TEST_DB_NAME = 'vl-hr-test-db';
const config: DataSourceOptions = {
  host: 'localhost',
  username: 'root',
  password: 'password',
  type: 'mysql',
  port: 3307,
  database: TEST_DB_NAME,
  logging: false,
  synchronize: true,
  entities: [__dirname + '/../src/**/*.entity{.ts,.js}'],
};

export const createDBBeforeTest = async (): Promise<void> => {
  console.log(`Dropping ${TEST_DB_NAME} database and recreating it`);

  const AppDataSource = new DataSource(config);
  await AppDataSource.initialize();
  await AppDataSource.synchronize();
};

export const closeDBAfterTest = async (): Promise<void> => {
  console.log(`closing ${TEST_DB_NAME} database`);
  const AppDataSource = new DataSource(config);
  await AppDataSource.dropDatabase();
  await AppDataSource.destroy();
};
