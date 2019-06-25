const { createConnection } = require('typeorm');

const connectionInstance = async () =>
	await createConnection({
		type: 'sqlite',
		name: 'default',
		database: './db.test.sqlite',
		entities: [__dirname + '../../src/Entities/*.ts'],
		synchronize: true,
	});

module.exports = connectionInstance;
