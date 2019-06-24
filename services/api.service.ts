import { ServiceSchema } from 'moleculer';
import ApiGateway = require('moleculer-web');

const ApiService: ServiceSchema = {
	name: 'api',

	mixins: [ApiGateway],

	// More info about settings: https://moleculer.services/docs/0.13/moleculer-web.html
	settings: {
		port: process.env.PORT || 3000,

		routes: [
			{
				aliases: {},
				cors: {
					credentials: true,
					methods: ['GET', 'OPTIONS', 'POST'],
					origin: ['*'],
				},
				path: '/api',
			},
		],

		// Serve assets from 'public' folder
		assets: {
			folder: 'public',
		},
	},
};

export = ApiService;
