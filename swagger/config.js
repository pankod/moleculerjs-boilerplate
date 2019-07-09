const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
	info: {
		title: 'Pankod MoleculerJS Boilerplate', // Title of the documentation
		version: '1.0.0', // Version of the app
		description:
			'Moleculer JS Microservice Boilerplate with Typescript, TypeORM, CLI, Service Clients, Swagger, Jest, Docker, Eslint support and everything you will ever need to deploy rock solid projects..', // short description of the app
	},
	host: 'localhost:3000', // the host or url of the app
	basePath: '/api', // the basepath of your endpoint
};

// options for the swagger docs
const options = {
	// import swaggerDefinitions
	definition: swaggerDefinition,
	explorer: true,

	// path to the API docs
	apis: ['./*.service.ts'],
};
// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
