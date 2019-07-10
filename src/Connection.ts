//#region Global Imports
import { createConnection } from 'typeorm';
//#endregion Global Imports

export const connectionInstance = async () =>
	await createConnection({
		type: 'sqlite',
		name: 'default',
		database: './db.sqlite',
		entities: [__dirname + '/Entities/*'],
		synchronize: true,
	});
