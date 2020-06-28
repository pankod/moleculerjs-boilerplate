//#region Global Imports
import { ServiceSchema } from 'moleculer';
import * as ApiGateway from 'moleculer-web';
//#endregion Global Imports

/**
 * @swagger
 *
 * definitions:
 *
 *   ErrorEntityNotFound:
 *     type: object
 *     required:
 *       - name
 *       - message
 *       - code
 *       - type
 *     properties:
 *       name:
 *         type: string
 *         example: "MoleculerError"
 *       message:
 *         type: string
 *         example: "Resource can't be found with options: {\"where\":{\"name\":\"Pew Pew\"}}"
 *       code:
 *         type: integer
 *         example: 404
 *       type:
 *         type: string
 *         example: "Not Found"
 *
 *   ErrorUnprocessableEntity:
 *     type: object
 *     required:
 *       - name
 *       - message
 *       - code
 *       - type
 *       - data
 *     properties:
 *       name:
 *         type: string
 *         example: "required"
 *       message:
 *         type: string
 *         example: "Parameters validation error!"
 *       code:
 *         type: integer
 *         example: 422
 *       type:
 *         type: string
 *         example: "VALIDATION_ERROR"
 *       data:
 *         type: array
 *         items:
 *           $ref: '#/definitions/ErrorUnprocessableEntityData'
 *
 *   ErrorUnprocessableEntityData:
 *     type: object
 *     required:
 *       - type
 *       - message
 *       - field
 *       - nodeID
 *       - action
 *     properties:
 *       type:
 *         type: string
 *         example: "required"
 *       message:
 *         type: string
 *         example: "The 'planetName' field is required."
 *       field:
 *         type: string
 *         example: "planetName"
 *       nodeID:
 *         type: string
 *         example: "asus-ubuntu-3505"
 *       action:
 *         type: string
 *         example: "attack.Fire"
 *
 *   ErrorUncaught:
 *     type: object
 *     required:
 *       - name
 *       - message
 *       - code
 *     properties:
 *       name:
 *         type: string
 *         example: "MoleculerError"
 *       message:
 *         type: string
 *         example: ""
 *       code:
 *         type: integer
 *         example: 500
 *
 * parameters:
 *
 *   weaponName:
 *     type: string
 *     name: weaponName
 *     example: 'Death Star'
 *     description: The weapon being used to attack.
 *
 *   planetName:
 *     type: string
 *     name: planetName
 *     example: 'Alderaan'
 *     description: The planet being attacked.
 *
 *   AttackPlanetParams:
 *     in: body
 *     name: params
 *     required:
 *       - weaponName
 *       - planetName
 *     schema:
 *       type: object
 *       properties:
 *         weaponName:
 *           $ref: '#/parameters/weaponName'
 *         planetName:
 *           $ref: '#/parameters/planetName'
 *     description: The weapon being used and planet being attacked.
 *
 * responses:
 *
 *   UnprocessableEntity:
 *     description: The request could not be processed.
 *     headers:
 *       content-type:
 *         description: The Content-Type entity header is used to indicate the media type of the resource.
 *         schema:
 *           type: string
 *           example: 'application/json; charset=utf-8'
 *     schema:
 *       $ref: '#/definitions/ErrorUnprocessableEntity'
 *
 *   EntityNotFound:
 *     description: The requested entity could not be found.
 *     headers:
 *       content-type:
 *         description: The Content-Type entity header is used to indicate the media type of the resource.
 *         schema:
 *           type: string
 *           example: 'application/json; charset=utf-8'
 *     schema:
 *       $ref: '#/definitions/ErrorEntityNotFound'
 *
 *   UncaughtError:
 *     description: The server encountered an unhandled error.
 *     headers:
 *       content-type:
 *         description: The Content-Type entity header is used to indicate the media type of the resource.
 *         schema:
 *           type: string
 *           example: 'application/json; charset=utf-8'
 *     schema:
 *       $ref: '#/definitions/ErrorUncaught'
 */
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
