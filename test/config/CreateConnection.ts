import { createConnection, Connection } from 'typeorm'

export default async (): Promise<Connection> => createConnection({
  type: 'sqlite',
  name: 'default',
  database: ':memory:',
  entities: ['./src/Entities/*.ts'],
  synchronize: true,
  dropSchema: true,
});