const { createConnection } = require('typeorm');

const connectionInstance = async () =>
	await createConnection({
		type: 'sqlite',
		name: 'default',
		database: './test/db.test.sqlite',
		entities: [__dirname + '../../src/Entities/*.ts'],
		synchronize: true,
		dropSchema: true,
	});

module.exports = connectionInstance;
