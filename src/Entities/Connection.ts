//#region Global Imports
import { createConnection, Connection } from 'typeorm';
//#endregion Global Imports

export default async (): Promise<Connection> => {
	try {
		return await createConnection({
			type: 'sqlite',
			name: 'default',
			database: './db.sqlite',
			entities: [__dirname + '/*'],
			synchronize: true,
		});
	} catch (error) {}
};
