const { createConnection } = require('typeorm');

const connectionInstance = async () =>
	await createConnection({
		type: 'sqlite',
		name: 'default',
		database: './db.sqlite',
		entities: [__dirname + '/Entities/*.ts'],
		synchronize: true,
	});

module.exports = connectionInstance;