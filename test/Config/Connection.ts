//#region Global Imports
import { createConnection, Connection } from 'typeorm';
//#region Global Imports

export default async (): Promise<Connection> =>
	await createConnection({
		type: 'sqlite',
		name: 'default',
		database: ':memory:',
		entities: ['./src/Entities/*.ts'],
		synchronize: true,
		dropSchema: true,
	});
