//#region Global Imports
import { createConnection, Connection } from 'typeorm';
//#endregion Global Imports

export default async(): Promise<Connection> =>
	await createConnection({
		type: 'sqlite',
		name: 'default',
		database: './db.sqlite',
		entities: [__dirname + '/Entities/*'],
		synchronize: true,
	});
